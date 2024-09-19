// src/App.js
import React, { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleNext = () => {
    setShowOnboarding(false);
  };

  return (
    <div>
      {showOnboarding ? (
        <OnboardingScreen onNext={handleNext} />
      ) : (
        // Main content of your app goes here
        <h1>Main App Screen</h1>
      )}
    </div>
  );
}

export default App;
