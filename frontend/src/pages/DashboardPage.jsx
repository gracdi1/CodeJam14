import React, { useState, useEffect } from 'react';
import '../styles/index.css'; // Import the CSS file

function DashboardPage() {
  const [inputValue, setInputValue] = useState(""); // Starts empty

  // Placeholder text
  const placeholderText = "Data will appear here...";

  useEffect(() => {
    // Simulate fetching dynamic text (you'll replace this logic with your file logic)
    setInputValue("based on our complex\nanalysis your music\ntaste is bad");
  }, []);

  const pageStyles = {
    background: 'linear-gradient(to bottom, #A5DEB9, #F5F5F5)', // Light green gradient
    minHeight: '100vh', // Full screen height
    display: 'flex', // Flexbox for centering
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center horizontally
    justifyContent: 'flex-start', // Keep content closer to the top
    paddingTop: '0.01vh', // Bring everything closer to the top
    color: '#234f23', // Green text to match the theme
  };

  const headingStyles = {
    fontSize: '100px', // Larger font size for the title
    marginBottom: '2px', // Minimize space below the title
  };

  const paragraphStyles = {
    fontSize: '18px',
    marginTop: '0px', // Remove space between title and description
    marginBottom: '20px', // Keep space between the description and input box
  };

  const boxWrapperStyles = {
    position: 'relative', // To stack the main box and the shadow
    marginTop: '40px', // Space above the box
  };

  const shadowBoxStyles = {
    position: 'absolute', // Positioned relative to the wrapper
    top: '10px', // Shifted slightly down
    left: '10px', // Shifted slightly to the right
    width: '100%', // Match the main box's width
    minHeight: '165px', // Match the main box's height
    backgroundColor: '#97D0AB', // Slightly paler green
    borderRadius: '20px', // Rounded corners
    zIndex: '1', // Behind the main box
  };

  const inputBoxStyles = {
    position: 'relative', // Relative to the shadow
    width: '600px', // Match the width of the shadow box
    minHeight: '120px', // Match the height
    backgroundColor: '#137C38', // Dark green background
    color: '#fff', // White text
    padding: '20px', // Padding inside the box
    borderRadius: '20px', // Rounded corners
    fontFamily: "'Roboto Mono', monospace", // Font style for the text
    fontSize: '20px', // Font size
    textAlign: 'center', // Center-align the text
    whiteSpace: 'pre-line', // Preserve line breaks in the dynamic text
    zIndex: '2', // Above the shadow
  };

  const logoutButtonStyles = {
    marginTop: '35px', // Space above the button
    padding: '10px 20px', // Button padding
    backgroundColor: '#fff', // White background
    color: '#234f23', // Green text
    border: '2px solid #234f23', // Green border
    borderRadius: '10px', // Rounded corners
    fontSize: '16px', // Font size
    fontFamily: "'Roboto Mono', monospace", // Match the font style
    cursor: 'pointer', // Pointer cursor on hover
    position: 'relative', // Positioned below the box
    transition: 'transform 0.1s ease, box-shadow 0.1s ease', // Smooth animation for hover effect
  };
  

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here, e.g., redirect to login page
  };

  const [isHovered, setIsHovered] = useState(false);

return (
  <div style={pageStyles}>
    <h1 className="title-bubble" style={headingStyles}>personify</h1>
    <p style={paragraphStyles}>What does your music say about you?</p>
    {/* Box wrapper with shadow */}
    <div style={boxWrapperStyles}>
      <div style={shadowBoxStyles}></div> {/* Background shadow */}
      <div style={inputBoxStyles}>
        {inputValue || placeholderText} {/* Show placeholder if no dynamic text */}
      </div>
    </div>
    {/* Logout button */}
    <button
      style={{
        ...logoutButtonStyles,
        transform: isHovered ? 'scale(0.95)' : 'scale(1)',
        boxShadow: isHovered
          ? 'inset 0px 4px 6px rgba(0, 0, 0, 0.2)'
          : '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
);

}

export default DashboardPage;
