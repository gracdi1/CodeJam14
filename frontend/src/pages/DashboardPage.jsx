import React from 'react';
import '../styles/index.css'; // Import the CSS file

function DashboardPage() {
  // Define the styles as a JavaScript object
  const pageStyles = {
    background: 'linear-gradient(to top, #d6f5d6, #99e699)', // Light green gradient
    minHeight: '100vh', // Full screen height
    padding: '20px', // Padding inside the page
    fontFamily: 'Arial, sans-serif', // Default font for the rest of the content
    color: '#234f23', // Green text to match the theme
  };

  const paragraphStyles = {
    fontSize: '18px',
    marginTop: '10px',
  };

  return (
    <div style={pageStyles}>
      {/* Apply the title-bubble class to the title */}
      <h1 className="title-bubble">Dashboard Page</h1>
      <p style={paragraphStyles}>Welcome to your dashboard!</p>
    </div>
  );
}

export default DashboardPage;