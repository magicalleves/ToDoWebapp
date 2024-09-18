// src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaTasks, FaCog } from 'react-icons/fa'; // Icon imports
import { colors } from '../assets/colors';
import noiseTexture from '../assets/noise.png'; // Import the noise texture image

const Sidebar = ({ groups }) => {
  return (
    <SidebarContainer>
      <TopSection>
        <LogoContainer>
          <FaTasks size={24} color="#fff" />
          <LogoText>To-Do</LogoText>
        </LogoContainer>

        <GroupsContainer>
          <GroupsTitle>Groups</GroupsTitle>
          {groups.map((group, index) => (
            <GroupItem key={index}>
              <GroupText>{group.title}</GroupText>
              <GroupDot color={group.color} />
            </GroupItem>
          ))}
        </GroupsContainer>

        <AddGroupButton>
          <FaPlus size={14} style={{ marginRight: '8px' }} />
          Add Groups
        </AddGroupButton>
      </TopSection>

      <BottomSection>
        <ProfileContainer>
          <ProfileImage src="https://via.placeholder.com/40" alt="profile" />
          <ProfileInfo>
            <ProfileName>Arian Kanani</ProfileName>
            <ProfileVersion>V0.01B</ProfileVersion>
          </ProfileInfo>
        </ProfileContainer>
        <SettingsIcon>
          <FaCog size={20} />
        </SettingsIcon>
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 300px;
  height: 96.3vh;                    /* Full height sidebar */
  display: flex;
  flex-direction: column;            /* Vertically align elements */
  justify-content: space-between;    /* Space between top and bottom */
  background-color: rgba(44, 44, 44, 0.7); /* Dark background */
  backdrop-filter: blur(10px);       /* Blur for glass effect */
  border-radius: 20px;               /* Rounded corners */
  padding: 20px;
  position: relative;
  background-image: url(${noiseTexture}), linear-gradient(transparent, transparent); /* Noisy texture */
  background-size: cover;
`;

const TopSection = styled.div`
  flex-grow: 1;                       /* Allow top section to grow */
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  color: white;
  margin-left: 10px;
`;

const GroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const GroupsTitle = styled.h2`
  color: #ccc;
  font-size: 18px;
  margin-bottom: 20px;
`;

const GroupItem = styled.div`
  background-color: rgba(44, 44, 44, 0.8); /* Darker background for group items */
  padding: 10px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(44, 44, 44, 1); /* Slightly darker on hover */
  }
`;

const GroupText = styled.span`
  color: white;
  font-size: 16px;
`;

const GroupDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const AddGroupButton = styled.button`
  background-color: rgba(44, 44, 44, 0.8); /* Dark button background */
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(44, 44, 44, 1); /* Slightly darker on hover */
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;                  /* Add some spacing */
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const ProfileVersion = styled.span`
  color: #aaa;
  font-size: 12px;
`;

const SettingsIcon = styled.div`
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }
`;
