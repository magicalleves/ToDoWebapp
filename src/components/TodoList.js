// src/components/TodoList.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const TodoList = ({ group }) => {
  const initialTasks = Array.from({ length: 5 }, (_, i) => `Task ${i + 1}`);
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);
    
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={group.title}>
        {(provided) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            <GroupTitle>{group.title}</GroupTitle>
            {tasks.map((task, index) => (
              <Draggable key={task} draggableId={task} index={index}>
                {(provided) => (
                  <TaskContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task title={task} />
                  </TaskContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;

// TodoList.js (snippet)
const ListContainer = styled.div`
  background-color: rgba(44, 44, 44, 0.5);  /* 50% opacity for glassy look */
  backdrop-filter: blur(10px);               /* Blur effect */
  padding: 20px;
  border-radius: ${(props) => (props.isFirst ? '0 20px 20px 0' : '20px')}; /* Adjust for first column */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border: 1px solid rgba(255, 255, 255, 0.15); /* Subtle white border */
  min-width: 250px;
  height: 95%;                  /* Full height to prevent overflow */
  margin-left: ${(props) => (props.isFirst ? '-1px' : '10px')}; /* Attach first column to the sidebar */
`;



const GroupTitle = styled.h2`
  margin-bottom: 10px;
  color: white;
  font-size: 20px;
`;

const TaskContainer = styled.div`
  margin-bottom: 10px;
`;
