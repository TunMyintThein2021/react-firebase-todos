import React, { useState, useRef } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Container, List, ListItem, Stack, Typography } from '@mui/material';


const DragDrop = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const initialState = [
    { name: "Todo Item 1", category: "todo", bgcolor: "#FFB695" },
    { name: "Todo Item 2", category: "todo", bgcolor: "#96D1CD" },
    { name: "Todo Item 3", category: "todo", bgcolor: "#ffc0cb" },
    { name: "Todo Item 4", category: "todo", bgcolor: "#bed3c1" },
    { name: "Todo Item 5", category: "todo", bgcolor: "#bed3c1" },
  ];

  const todosLists = [
    // { title: "To-do", todos: data, },
    { title: "Progress", progress: [], },
    { title: "Completed", completed: [], },
  ];

  const [lists, setLists] = useState(initialState);
  const [todos, setTodos] = useState(todosLists);

  const dragStart = (e, position) => {
    // this.dragged = e.currentTarget;
    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', this.dragged);
    dragItem.current = position;
    e.dataTransfer.setData("position", position);
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const handleDrop = (event, cat) => {
    const listItems = [...lists];
    const dragItemContent = listItems[dragItem.current];
    listItems.splice(dragItem.current, 1);
    listItems.splice(dragOverItem.current, 0, dragItemContent);
    // dragItem.current = null;
    // dragOverItem.current = null;
    setLists(listItems);
    // const todoItems = [...todos];
    let position = event.dataTransfer.getData("position");
    let tasks = position.filter((task) => {
      if (task.name === position) {
        task.category = cat;
      }
      return task;
    });
    setTodos({ ...todos, tasks });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography variant='h4'>DRAG & DROP DEMO</Typography>
        <Stack position="relative">
          <Box>
            <Typography variant='h6'>Todo</Typography>
            <List>
              {lists.map((item, index) => (
                <ListItem
                  key={index}
                  draggable={true}
                  // onDragStart={dragStart}
                  onDragStart={(e) => { dragStart(e, index) }}
                  // onDragEnter={dragEnter}
                  onDragEnter={(e) => { dragEnter(e, index) }}
                  onDragEnd={handleDrop}
                >{item.name}</ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Typography variant='h6'>Progress</Typography>
            <List
              onDragStart={(e) => { dragStart(e) }}
              onDragEnd={handleDrop}
            // onDragEnd={(e) => { handleDrop(e, "todo") }}
            >
              {todos.progress}
            </List>
          </Box>
          <Box>
            <Typography variant='h6'>Completed</Typography>
            <List
              onDrop={(e) => handleDrop(e, "done")}
            // onDragOver={(ev) => onDragOver(ev)}
            >
              {/* {tasks.done} */}
            </List>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

const theme = createTheme({
  typography: {
    h4: {
      paddingTop: '30px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    h6: {
      display: 'block',
      padding: '10px 0',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#45597E',
      backgroundColor: '#DBE2F4',
      borderBottom: '2px solid #45597E',
    },
  },
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
          flexDirection: 'unset',
          ".MuiBox-root": {
            width: '200px',
            backgroundColor: '#FBF2ED',
            border: '2px solid #45597E',
            ".MuiList-root": {
              padding: '40px 15px',
              backgroundColor: '#FBF2ED',
              ".MuiListItem-root": {
                marginBottom: '15px',
                fontFamily: 'sans-serif',
                fontWeight: '600',
                textAlign: 'center',
                color: '#45597E',
                border: '2px solid #45597E',
                backgroundColor: '#FFB695',
              },
            },
          },
        },
      },
    },
  },
});

export default DragDrop;