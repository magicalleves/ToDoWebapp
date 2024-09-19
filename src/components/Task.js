// src/components/Task.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import motion
import { colors } from '../assets/colors';

const Task = ({ title }) => {
  return (
    <TaskContainer
      as={motion.div} // Use motion.div for drag
      drag // Enable dragging
      whileHover={{ scale: 1.03 }} // Add a hover effect
      whileTap={{ scale: 0.98 }}   // Add a tap effect
    >
      <TaskTitle>{title}</TaskTitle>
      <TaskDue>Due Tomorrow</TaskDue>
    </TaskContainer>
  );
};

export default Task;

const TaskContainer = styled.div`
  background-color: ${colors.todoItem};
  color: ${colors.textLight};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const TaskTitle = styled.div`
  font-size: 16px;
`;

const TaskDue = styled.div`
  font-size: 12px;
  color: ${colors.textLight};
`;
