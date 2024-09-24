import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import googleLogo from '../assets/google.png';
import screenBackgroundImage from '../assets/bgdark.jpg';

const LoginPage = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
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
          navigate('/main', { state: { profile: res.data } });
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  return (
    <LoginContainer>
      <GlassPanel>
        <Title>Log back into your account</Title>
        <Subtitle>Choose one of the socials below</Subtitle>
        <ButtonContainer>
          <SocialButton bgColor="#fff" textColor="#000" onClick={login}>
            <Icon src={googleLogo} alt="Google" />
            Connect Google
          </SocialButton>
          <SocialButton bgColor="#1877F2" textColor="#fff">
            <Icon src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
            Connect Facebook
          </SocialButton>
        </ButtonContainer>
      </GlassPanel>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${screenBackgroundImage});
  background-size: cover;
  background-position: center;
  background-color: rgba(44, 44, 44, 0.6);
  backdrop-filter: blur(10px);
`;

const GlassPanel = styled.div`
  background-color: rgba(44, 44, 44, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 60px 80px;
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
  color: #fff;
  margin-bottom: -10px;
`;

const Subtitle = styled.p`
  font-size: 25px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
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
