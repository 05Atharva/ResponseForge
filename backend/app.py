"""
ResponseForge - Main Flask Application
========================================
A NIST SP 800-61 compliant Incident Response template generator.

This module initializes the Flask application with security middleware,
rate limiting, and CORS configuration.
"""

import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Import routes
from routes.ir_routes import ir_blueprint

# =============================================================================
# Application Factory
# =============================================================================

def create_app():
    """
    Create and configure the Flask application.
    
    Returns:
        Flask: Configured Flask application instance
    """
    app = Flask(__name__)
    
    # ---------------------------------------------------------------------------
    # Configuration
    # ---------------------------------------------------------------------------
    
    # Maximum content length: 16KB to prevent large payload attacks
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024
    
    # Secret key for sessions (not used in this API, but good practice)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # ---------------------------------------------------------------------------
    # CORS Configuration
    # ---------------------------------------------------------------------------
    # Allow requests from frontend development server
    # For development, we'll allow all origins. In production, restrict this.
    
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",  # Allow all origins for development
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"],
            "supports_credentials": False
        }
    })
    
    # ---------------------------------------------------------------------------
    # Rate Limiting
    # ---------------------------------------------------------------------------
    # Prevent abuse by limiting requests per IP
    
    limiter = Limiter(
        key_func=get_remote_address,
        app=app,
        default_limits=["100 per hour"],
        storage_uri="memory://"
    )
    
    # Apply stricter limits to the generation endpoint
    @limiter.limit("10 per minute")
    def limited_generate():
        pass  # Limit is applied via decorator in routes
    
    # ---------------------------------------------------------------------------
    # Register Blueprints
    # ---------------------------------------------------------------------------
    
    app.register_blueprint(ir_blueprint, url_prefix='/api')
    
    # ---------------------------------------------------------------------------
    # Error Handlers
    # ---------------------------------------------------------------------------
    
    @app.errorhandler(413)
    def request_entity_too_large(error):
        """Handle payload too large errors."""
        return jsonify({
            'success': False,
            'error': 'Request payload too large. Maximum size is 16KB.'
        }), 413
    
    @app.errorhandler(429)
    def ratelimit_handler(error):
        """Handle rate limit exceeded errors."""
        return jsonify({
            'success': False,
            'error': 'Rate limit exceeded. Please try again later.'
        }), 429
    
    @app.errorhandler(500)
    def internal_error(error):
        """Handle internal server errors."""
        return jsonify({
            'success': False,
            'error': 'An internal error occurred. Please try again.'
        }), 500
    
    # ---------------------------------------------------------------------------
    # Health Check Endpoint
    # ---------------------------------------------------------------------------
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Simple health check endpoint."""
        return jsonify({'status': 'healthy', 'service': 'ResponseForge API'})
    
    return app


# =============================================================================
# Application Entry Point
# =============================================================================

if __name__ == '__main__':
    app = create_app()
    
    # Run in development mode
    # In production, use gunicorn or similar WSGI server
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
