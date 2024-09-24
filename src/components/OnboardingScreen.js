import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import glassBackgroundImage from '../assets/background.png';
import screenBackgroundImage from '../assets/bgdark.jpg';
import googleLogo from '../assets/google.png';
import appleLogo from '../assets/apple.png';
import '../App.css';

const OnboardingScreen = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState('dark');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
          setStep(3);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleImageSelect = (image) => {
    const selectedImagesMap = {
      1: '1a.jpg',
      2: '2a.jpg',
      3: '3a.jpg',
      4: '4a.jpg',
      5: '5a.jpg',
      6: '6a.jpg',
    };
    setSelectedImage(selectedImagesMap[image]);
  };

  const handleFinish = () => {
    navigate('/main', { state: { selectedImage, profile } });
  };

  return (
    <OnboardingContainer theme={theme} selectedImage={selectedImage}>
      {step === 1 && (
        <GlassPanel theme={theme}>
          <Title>Welcome to Farmium Todo</Title>
          <Subtitle>Let's get you started</Subtitle>
          <StartButton onClick={handleNext}>
            Get started
            <ArrowIcon>→</ArrowIcon>
          </StartButton>
        </GlassPanel>
      )}

      {step === 2 && (
        <GlassPanel theme={theme}>
          <Title>Create an account using your socials</Title>
          <Subtitle>Choose one of the socials below</Subtitle>
          <ButtonContainer>
            <SocialButton bgColor="#fff" textColor="#000" onClick={login}>
              <Icon src={googleLogo} alt="Google" />
              Connect Google
            </SocialButton>
            {/* <SocialButton bgColor="#000" textColor="#fff" onClick={handleNext}>
              <Icon src={appleLogo} alt="Apple" />
              Connect Apple
            </SocialButton> */}
            <SocialButton bgColor="#1877F2" textColor="#fff" onClick={handleNext}>
              <Icon src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
              Connect Facebook
            </SocialButton>
          </ButtonContainer>
        </GlassPanel>
      )}

      {step === 3 && (
        <GlassPanel theme={theme}>
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
        <GlassPanel theme={theme}>
          <Title>Good Choice, How about a picture?</Title>
          <Subtitle>Select a Background</Subtitle>
          <BackgroundGrid>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <BackgroundImage
                key={num}
                src={require(`../assets/backgrounds/${num}.png`)}
                isSelected={selectedImage === `${num}a.jpg`}
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
        <GlassPanel theme={theme}>
          <Title>You are all set! Enjoy using your space</Title>
          <Subtitle>You can further customize your space in settings</Subtitle>
          <StartButton onClick={handleFinish}>
            Go to your Space
            <ArrowIcon>→</ArrowIcon>
          </StartButton>
        </GlassPanel>
      )}

      {showPopup && <LoginPopup>Logged in successfully!</LoginPopup>}
    </OnboardingContainer>
  );
};

export default OnboardingScreen;

const OnboardingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${({ selectedImage }) => 
    selectedImage ? `url(${require(`../assets/backgrounds/${selectedImage}`)})` : `url(${screenBackgroundImage})`};
  background-size: cover;
  background-position: center;
  position: relative;
  background-color: ${({ theme }) => (theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)')};
`;

const GlassPanel = styled.div`
  background-image: ${({ theme }) => 
    theme === 'dark' ? `url(${glassBackgroundImage})` : 'none'};
  background-color: ${({ theme }) => 
    theme === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
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
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  margin-bottom: -10px;
`;

const Subtitle = styled.p`
  font-size: 25px;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)')};
  margin-bottom: 30px;
`;

const StartButton = styled.button`
  background-color: ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)')};
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
  margin-right: 10px;
`;

const ThemeContainer = styled.div`
  margin-bottom: 30px;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 12px;
  border-radius: 16px;
`;

const ToggleButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const LoginPopup = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: #fff;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 2s, ${fadeOut} 2s 4s;
  opacity: 0;
  z-index: 100;
`;
