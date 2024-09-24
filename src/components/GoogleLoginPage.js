import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("GoogleLoginPage mounted");

    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id: '1067684628324-vlv8kqgfsm32fvefln6fsipcrfsemqua.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    // Render the button
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
  }, []);

  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);

    // Send token to the backend for verification
    axios
      .post('http://localhost:5001/api/auth/google', { token: response.credential })
      .then((res) => {
        console.log('Backend response:', res.data);
        navigate('/main'); // Navigate to the main page
      })
      .catch((error) => {
        console.error('Error during Google login:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h1>Google Sign-In</h1>
      <div id="googleSignInDiv"></div> {/* Google Sign-In Button */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
};

export default GoogleLoginPage;
