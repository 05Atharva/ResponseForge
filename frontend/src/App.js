import React from 'react';
import './ReportForm.css';
import ReportForm from './ReportForm'; // Adjust the path as needed

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to <span className="highlight">ARTEMIS</span></h1>
        <h2>Generate a customized IR template in just a few clicks</h2>
      </header>
      
      <div className="app-content">
        <div className="intro-section">
          <p>ARTEMIS provides an intuitive platform for creating professional incident response templates tailored to your organization's specific needs.</p>
          
          <p>Our streamlined process guides you through each step of template generation, ensuring comprehensive coverage of all critical IR components.</p>
          
          <p>Get started today to improve your incident response preparedness.</p>
        </div>
        
        {/* This is where the ReportForm component is integrated */}
        <ReportForm />
      </div>
    </div>
  );
}

export default App;