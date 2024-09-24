import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoIcon from '../assets/Logo.svg';
import inboxIcon from '../assets/inbox-icon.svg';
import todayIcon from '../assets/today-icon.svg';
import greenButtonImage from '../assets/GreenButton.png';
import arrowsIcon from '../assets/Arrows.svg';
import screenBackgroundImage from '../assets/bgdark.jpg'; // Add this if you want to use a fallback background
import '../App.css';

const MainPage = () => {
  const location = useLocation();
  const [isMainContentVisible, setMainContentVisible] = useState(true);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  
  // Set default background image to 1a.jpg if none is selected
  const [selectedImage, setSelectedImage] = useState(location.state?.selectedImage || '1a.jpg');
  
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.profile) {
      setProfile(location.state.profile);
    }

    // Check if selectedImage was provided, else default to 1a.jpg
    if (!location.state?.selectedImage) {
      setSelectedImage('1a.jpg');
    }
  }, [location.state]);

  const handleAddGroupClick = () => {
    setMainContentVisible(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsVisible(false);
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

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
    navigate('/login');
  };

  return (
    <MainContainer selectedImage={selectedImage}>
      {!isSettingsVisible && (
        <Sidebar>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <LogoButton>
              <LogoContent>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <LogoIcon src={logoIcon} alt="To-Do Logo" />
                  <p style={{ marginLeft: 15, color: 'white', fontWeight: 600, fontSize: 16 }}>To-Do</p>
                </span>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 5, marginRight: -10 }}>
                  <ArrowsIcon src={arrowsIcon} alt="Arrows" />
                </div>
              </LogoContent>
            </LogoButton>

            <SidebarContent>
              <SidebarButton isSelected={true}>
                <SidebarIcon src={inboxIcon} />
                <p style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>Inbox</p>
              </SidebarButton>

              <SidebarButton>
                <SidebarIcon src={todayIcon} />
                <p style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>Today</p>
              </SidebarButton>

              <SidebarButton isDashed={true} onClick={handleAddGroupClick}>
                <SidebarAddGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>Add Group</p>
                  <span>+</span>
                </SidebarAddGroup>
              </SidebarButton>
            </SidebarContent>
          </motion.div>

          <UserSection>
            {profile ? (
              <ProfileInfo>
                <ProfileImage src={profile.picture} alt="user image" />
                <ProfileTextContainer>
                  <ProfileName>{profile.name}</ProfileName>
                </ProfileTextContainer>
              </ProfileInfo>
            ) : (
              <ProfileInfo>
                <ProfileImage src="https://via.placeholder.com/40" alt="profile" />
                <ProfileTextContainer>
                  <ProfileName>Guest</ProfileName>
                </ProfileTextContainer>
              </ProfileInfo>
            )}
            <SettingsIcon onClick={handleSettingsClick}>⚙️</SettingsIcon>
          </UserSection>
        </Sidebar>
      )}

      {isSettingsVisible && (
        <SettingsContainer theme={theme}>
          <BackArrow onClick={handleCloseSettings}>← Settings</BackArrow><br/><br/><br/>
          <ProfileSection>
            <SettingsProfileImage src={profile?.picture} alt="Profile" />
            <SettingsProfileName>{profile?.name}</SettingsProfileName>
            <ProfileEmail>{profile?.email} (Google)</ProfileEmail>
          </ProfileSection>

          <p style={{color: 'white', fontWeight: 400, marginRight: 'auto'}}>Theme</p>

          <ThemeContainer>
            <ToggleButtonContainer>
              <ToggleButton
                isSelected={theme === 'light'}
                onClick={() => handleThemeChange('light')}
              >
                Light
              </ToggleButton>

              <ToggleButton
                isSelected={theme === 'dark'}
                onClick={() => handleThemeChange('dark')}
              >
                Dark
              </ToggleButton>
            </ToggleButtonContainer>
          </ThemeContainer>

          <p style={{color: 'white', fontWeight: 400, marginRight: 'auto'}}>Background</p>
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

          <button style={{backgroundColor: '#2c2c2c99', color: 'white', fontWeight: 400, fontSize: 18, border: 'none', padding: '10px 100px', borderRadius: 12}} onClick={logOut}>Log out</button>
        </SettingsContainer>
      )}

      {!isMainContentVisible && (
        <NewGroupContainer>
          <NewGroupHeader>
            <NewGroupIcon />
            <NewGroupText>New Group</NewGroupText>
          </NewGroupHeader>
          <AddSubgroupButton>Add a Subgroup</AddSubgroupButton>
        </NewGroupContainer>
      )}

      {isMainContentVisible && !isSettingsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <MainContent>
            <InboxContainer>
              <InboxTitle>Inbox</InboxTitle>
              <TaskInfoText>Add more tasks to see them here</TaskInfoText>
              <AddTaskInputContainer>
                <AddTaskInput placeholder="Add Task" />
                <AddTaskButton>+</AddTaskButton>
              </AddTaskInputContainer>
            </InboxContainer>
          </MainContent>
        </motion.div>
      )}
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  background-image: url(${(props) => require(`../assets/backgrounds/${props.selectedImage}`)});
  background-size: cover;
  background-position: center;
`;


const Sidebar = styled.div`
  width: 22vw;
  height: 94.7vh;
  background-color: rgba(44, 44, 44, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 30px;
  margin-right: -5px;
`;

const LogoButton = styled.button`
  background-image: url(${greenButtonImage});
  background-size: cover;
  background-position: center;
  border: none;
  width: 100%;
  height: 50px;
  padding: 20px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const LogoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: -10px;
`;

const ArrowsIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const SidebarContent = styled.div`
  flex-grow: 1;
  margin-top: 30px;
`;

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected ? '#121212' : 'rgba(18, 18, 18, 0.8)'};
  border: none;
  color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;
  height: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isDashed ? 'rgba(255, 255, 255, 0.2)' : 'rgba(44, 44, 44, 0.9)'};
    transform: ${(props) => (props.isDashed ? 'scale(1.05)' : 'none')};
  }

  ${(props) =>
    props.isDashed &&
    `
    background-color: transparent;
    border: 1px solid white;
    border-style: dashed;
  `}
`;

const SidebarIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const SidebarAddGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  opacity: 0.7;
  width: 100%;
`;

const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const SettingsIcon = styled.div`
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 30px;
  height: 100vh;
`;

const InboxContainer = styled.div`
  background-color: rgba(44, 44, 44, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InboxTitle = styled.h1`
  color: white;
  font-size: 24px;
`;

const TaskInfoText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
  font-size: 18px;
`;

const AddTaskInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddTaskInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  font-size: 16px;
`;

const AddTaskButton = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const NewGroupContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewGroupHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(44, 44, 44, 0.6);
  backdrop-filter: blur(10px);
  padding: 15px;
  border-radius: 16px;
  margin-bottom: 10px;
  width: 96%;
  height: 96px;
`;

const NewGroupIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  margin-right: 10px;
`;

const NewGroupText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 25px;
  background-color: rgba(44, 44, 44, 1);
  padding: 10px;
  border-radius: 12px;
`;

const AddSubgroupButton = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 16px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const SettingsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 720px;
  background-color: rgba(44, 44, 44, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GlassPanel = styled.div`
  background-image: ${({ theme }) =>
    theme === 'dark' ? `url(${require('../assets/background.png')})` : 'none'};
  background-color: ${({ theme }) =>
    theme === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 18px;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  margin-bottom: 10px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0px;
`;

const SettingsProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;
`;

const SettingsProfileName = styled.h2`
  font-size: 25px;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  margin-top: 10px;
  font-weight: 400;
`;

const ProfileEmail = styled.p`
  font-size: 20px;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  margin-top: -15px;
  font-weight: 100;
`;

const ThemeContainer = styled.div`
  margin-bottom: 10px;
  margin-top: -10px;
  background-color: #2c2c2c99;
  padding: 12px;
  border-radius: 16px;

  width: 100%;
  display: flex;
  justify-content: center;
`;

const ToggleButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ToggleButton = styled.button`
  padding: 5px 23px;
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
  padding: 12px 40px;
  margin-bottom: 30px;
  background-color: #2c2c2c99;

  border-radius: 16px;
  width: 100%;
`;

const BackgroundImage = styled.img`
  width: 120px;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  border: ${(props) => (props.isSelected ? '2px solid white' : 'none')};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackArrow = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;
