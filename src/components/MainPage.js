// src/components/MainPage.js
import React from 'react';
import styled from 'styled-components';
import glassBackgroundImage from '../assets/background.png';
import screenBackgroundImage from '../assets/bgdark.jpg';
import logoIcon from '../assets/Logo.svg';
import inboxIcon from '../assets/inbox-icon.svg';
import todayIcon from '../assets/today-icon.svg';
import greenButtonImage from '../assets/GreenButton.png';
import arrowsIcon from '../assets/Arrows.svg'; // Import the new Arrows icon
import '../App.css';

const MainPage = () => {
  return (
    <MainContainer>
      <Sidebar>

        <LogoButton>
          <LogoContent>
            <LogoIcon src={logoIcon} alt="To-Do Logo" />
            <Div style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 5, borderRadius: 5, marginRight: -10}}>
              <ArrowsIcon src={arrowsIcon} alt="Arrows" /> 
            </Div>
          </LogoContent>
        </LogoButton>

        <SidebarContent>
          <SidebarButton isSelected={true}>
            <SidebarIcon src={inboxIcon} />
            Inbox
          </SidebarButton>

          <SidebarButton>
            <SidebarIcon src={todayIcon} />
            Today
          </SidebarButton>

          <SidebarButton style={{ backgroundColor: 'transparent', border: '1px solid white', borderStyle: 'dashed' }}>
            <SidebarAddGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Add Group</p>  <span>+</span>
            </SidebarAddGroup>
          </SidebarButton>
        </SidebarContent>

        <UserSection>

          <ProfileInfo>
            <ProfileImage src="https://via.placeholder.com/40" alt="profile" />
            <ProfileTextContainer>
              <ProfileName>Meow meow</ProfileName>
              <ProfileVersion>V0.01B</ProfileVersion>
            </ProfileTextContainer>
          </ProfileInfo>

          <SettingsIcon>⚙️</SettingsIcon>

        </UserSection>

      </Sidebar>

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

    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  background-image: url(${screenBackgroundImage});
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(44, 44, 44, 0.9);
  }
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

const ProfileVersion = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
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

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
