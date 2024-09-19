// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import { colors } from './assets/colors';
import backgroundImage from './assets/bg.jpg';  
const initialGroups = {
  Farmium: ['Task 1', 'Task 2'],
  Educational: ['Task 3', 'Task 4'],
  Extracurricular: ['Task 5', 'Task 6'],
  MUN: ['Task 7', 'Task 8'],
};

function App() {
  const [groups, setGroups] = useState(initialGroups);

  // Handle task drop
  const handleTaskDrop = (task, newGroup) => {
    setGroups((prevGroups) => {
      // Find the old group and remove the task
      const oldGroup = Object.keys(prevGroups).find((group) =>
        prevGroups[group].includes(task)
      );
      if (!oldGroup) return prevGroups; // In case task isn't found

      // Remove from old group and add to new group
      const updatedOldGroup = prevGroups[oldGroup].filter(
        (item) => item !== task
      );
      const updatedNewGroup = [...prevGroups[newGroup], task];

      return {
        ...prevGroups,
        [oldGroup]: updatedOldGroup,
        [newGroup]: updatedNewGroup,
      };
    });
  };

  return (
    <AppContainer>
      <BackgroundOverlay />
      <Sidebar groups={Object.keys(groups)} />
      <MainContent>
        {Object.keys(groups).map((group, index) => (
          <TodoList
            key={index}
            group={{ title: group, color: colors.groupTitle[group] }}
            tasks={groups[group]}
            onTaskDrop={handleTaskDrop}
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
  background-color: rgba(0, 0, 0, 0.5);  
  backdrop-filter: blur(20px);          
  z-index: -1;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-gap: 10px;
  padding: 20px;
  height: calc(100vh - 40px); 
  width: 100%;
  overflow: hidden;           
  position: relative;
  z-index: 1;
`;


