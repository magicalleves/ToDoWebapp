// src/App.js
import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import { colors } from './assets/colors';
import backgroundImage from './assets/bg.jpg';  // Import background image

const groups = [
  { title: 'Farmium', color: colors.groupTitle.farmium },
  { title: 'Educational', color: colors.groupTitle.educational },
  { title: 'Extracurricular', color: colors.groupTitle.extracurricular },
  { title: 'MUN', color: colors.groupTitle.mun },
];

function App() {
  return (
    <AppContainer>
      <BackgroundOverlay />
      <Sidebar groups={groups} />
      <MainContent>
        {groups.map((group, index) => (
          <TodoList 
            key={index} 
            group={group} 
            isFirst={index === 0} /* Pass isFirst prop to first column */
          />
        ))}
      </MainContent>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);  /* Optional: darken the background */
  backdrop-filter: blur(20px);            /* Adds blur effect */
  z-index: -1;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Ensure 4 columns */
  grid-gap: 10px;
  padding: 20px;
  height: calc(100vh - 40px); /* Full height minus padding */
  width: 100%;
  overflow: hidden;           /* Ensure no scrolling */
  position: relative;
  z-index: 1;
`;

