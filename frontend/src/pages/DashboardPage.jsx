import React, { useState, useEffect } from 'react';
import '../styles/index.css'; // Import the CSS file

function DashboardPage() {
  const [inputValue, setInputValue] = useState(""); // Starts empty
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const placeholderText = "Data will appear here...";

  useEffect(() => {
    const fetchPersonalityData = async () => {
      try {
        setIsLoading(true); // Set loading state
        console.log("Fetching personality data...");
        
        const response = await fetch('http://localhost:3000/analyze-personality', {
          method: 'GET',
        });

        console.log("Response status:", response.status); // Debugging log

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setInputValue(data.message || "No personality data found."); // Set the personality message
        console.log("Fetched data:", data); // Debugging log
      } catch (err) {
        console.error("Fetch error:", err); // Log detailed error to console
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false); // Remove loading state
      }
    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchPersonalityData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  const pageStyles = {
    background: 'linear-gradient(to bottom, #A5DEB9, #F5F5F5)', // Light green gradient
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '0.01vh',
    color: '#234f23',
  };

  const headingStyles = {
    fontSize: '100px',
    marginBottom: '2px',
  };

  const paragraphStyles = {
    fontSize: '18px',
    marginTop: '0px',
    marginBottom: '20px',
  };

  const boxWrapperStyles = {
    position: 'relative',
    marginTop: '40px',
  };

  const shadowBoxStyles = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '100%',
    minHeight: '165px',
    backgroundColor: '#97D0AB',
    borderRadius: '20px',
    zIndex: '1',
  };

  const inputBoxStyles = {
    position: 'relative',
    width: '600px',
    minHeight: '120px',
    backgroundColor: '#137C38',
    color: '#fff',
    padding: '20px',
    borderRadius: '20px',
    fontFamily: "'Roboto Mono', monospace",
    fontSize: '20px',
    textAlign: 'center',
    whiteSpace: 'pre-line',
    zIndex: '2',
  };

  const logoutButtonStyles = {
    marginTop: '35px',
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#234f23',
    border: '2px solid #234f23',
    borderRadius: '10px',
    fontSize: '16px',
    fontFamily: "'Roboto Mono', monospace",
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
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
          {isLoading ? "Loading your analysis..." : error ? error : inputValue || placeholderText}
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
