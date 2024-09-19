// src/components/TodoList.js
import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import motion for drag
import Task from './Task';

const TodoList = ({ group, tasks, onTaskDrop }) => {
  const constraintsRef = useRef(null); // To limit drag bounds

  return (
    <ListContainer ref={constraintsRef}>
      <GroupTitle>{group.title}</GroupTitle>
      <DropZone
        as={motion.div}
        onDrop={(e) => {
          const taskTitle = e.dataTransfer.getData('task');
          onTaskDrop(taskTitle, group.title); // Handle task drop
        }}
        onDragOver={(e) => e.preventDefault()} // Allow dragging over
      >
        {tasks.map((task, index) => (
          <TaskContainer
            key={index}
            as={motion.div}
            drag
            dragData={{ task }}
            dragConstraints={constraintsRef} // Constrain dragging within container
            onDragStart={(e) => e.dataTransfer.setData('task', task)} // Transfer task data
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ zIndex: 10, position: 'relative' }} // Ensure dragging over boxes
          >
            <Task title={task} />
          </TaskContainer>
        ))}
      </DropZone>
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  background-color: rgba(44, 44, 44, 0.5);  /* 50% opacity for glassy look */
  backdrop-filter: blur(10px);               /* Blur effect */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border: 1px solid rgba(255, 255, 255, 0.15); /* Subtle white border */
  min-width: 250px;
  height: 95%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  position: relative; /* For drag constraints */
`;

const DropZone = styled.div`
  flex-grow: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const GroupTitle = styled.h2`
  margin-bottom: 10px;
  color: white;
  font-size: 20px;
`;

const TaskContainer = styled.div`
  margin-bottom: 10px;
  z-index: 10;
  position: relative;
`;
