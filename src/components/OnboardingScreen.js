// src/components/OnboardingScreen.js
import React, { useState } from 'react';
import styled from 'styled-components';
import glassBackgroundImage from '../assets/background.png';
import screenBackgroundImage from '../assets/bgdark.jpg';
import '../App.css';

const OnboardingScreen = () => {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState('dark');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <OnboardingContainer>
      {step === 1 && (
        <GlassPanel>
          <Title>Welcome to Farmium Todo</Title>
          <Subtitle>Let's get you started</Subtitle>
          <StartButton onClick={handleNext}>
            Get started
            <ArrowIcon>→</ArrowIcon>
          </StartButton>
        </GlassPanel>
      )}

      {step === 2 && (
        <GlassPanel>
          <Title>Create an account using your socials</Title>
          <Subtitle>Choose one of the socials below</Subtitle>
          <ButtonContainer>
            <SocialButton bgColor="#fff" textColor="#000" onClick={handleNext}>
              <Icon src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
              Connect Google
            </SocialButton>
            <SocialButton bgColor="#000" textColor="#fff" onClick={handleNext}>
              <Icon src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
              Connect Apple
            </SocialButton>
            <SocialButton bgColor="#1877F2" textColor="#fff" onClick={handleNext}>
              <Icon src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
              Connect Facebook
            </SocialButton>
          </ButtonContainer>
        </GlassPanel>
      )}

      {step === 3 && (
        <GlassPanel>
          <Title>Fantastic! Now let's customize your space</Title>
          <Subtitle>Select a theme</Subtitle>
          <ThemeContainer>
            <ToggleButtonContainer>
              <ToggleButton
                isSelected={theme === 'light'}
                onClick={() => setTheme('light')}
              >
                Light
              </ToggleButton>
              <ToggleButton
                isSelected={theme === 'dark'}
                onClick={() => setTheme('dark')}
              >
                Dark
              </ToggleButton>
            </ToggleButtonContainer>
          </ThemeContainer>
          <StartButton onClick={handleNext}>
            This looks good
            <ArrowIcon>→</ArrowIcon>
          </StartButton>
        </GlassPanel>
      )}

      {step === 4 && (
        <GlassPanel>
          <Title>Good Choice, How about a picture?</Title>
          <Subtitle>Select a Background</Subtitle>
          <BackgroundGrid>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <BackgroundImage
                key={num}
                src={require(`../assets/backgrounds/${num}.png`)}
                isSelected={selectedImage === num}
                onClick={() => handleImageSelect(num)}
              />
            ))}
          </BackgroundGrid>
          <StartButton onClick={handleNext}>
            I like this one
            <ArrowIcon>→</ArrowIcon>
          </StartButton>
        </GlassPanel>
      )}

      {step === 5 && (
        <GlassPanel>
          <Title>You are all set! Enjoy using your space</Title>
          <Subtitle>You can further customize your space in settings</Subtitle>
          <StartButton onClick={() => alert('Navigate to the space')}>
            Go to your Space
            <ArrowIcon>→</ArrowIcon>
          </StartButton>
        </GlassPanel>
      )}
    </OnboardingContainer>
  );
};

export default OnboardingScreen;

const OnboardingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${screenBackgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const GlassPanel = styled.div`
  background-image: url(${glassBackgroundImage});
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 95vw;
  height: 95vh;
`;

const Title = styled.h1`
  font-size: 38px;
  color: white;
  margin-bottom: -10px;
`;

const Subtitle = styled.p`
  font-size: 25px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
`;

const StartButton = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const ArrowIcon = styled.span`
  margin-left: 70px;
  font-size: 18px;
  transition: margin-left 0.2s ease;
  
  ${StartButton}:hover & {
    margin-left: 100px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialButton = styled.button`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ThemeContainer = styled.div`
  margin-bottom: 30px;
`;

const ToggleButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isSelected ? '#E6E6E6' : 'transparent'};
  color: ${(props) =>
    props.isSelected ? '#000000' : '#E6E6E6'};
  border: ${(props) =>
    props.isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: #E6E6E6;
    color: #000;
  }
`;

const BackgroundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-bottom: 30px;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 12px;
  border-radius: 12px;
`;

const BackgroundImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  border: ${(props) => (props.isSelected ? '2px solid white' : 'none')};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;
