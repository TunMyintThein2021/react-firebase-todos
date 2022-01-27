import React, { Component } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Container, List, ListItem, Stack, Typography } from '@mui/material';


class DragDrop extends Component {
  state = {
    tasks: [
      { name: "todos Item 1", category: "todo", bgcolor: "#FFB695" },
      { name: "todos Item 2", category: "todo", bgcolor: "#96D1CD" },
      { name: "todos Item 3", category: "todo", bgcolor: "#ffc0cb" },
      { name: "todos Item 4", category: "todo", bgcolor: "#bed3c1" },
    ]
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({ ...this.state, tasks });
  };

  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
  };

  render() {
    var tasks = {
      todo: [],
      done: []
    };

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <ListItem key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </ListItem>
      );
    });

    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Typography variant='h4'>React Drag & Drop Demo</Typography>
          <Stack position="relative">
            <Box>
              <Typography variant='h6'>To-Do List</Typography>
              <List
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => { this.onDrop(e, "todo") }}>
                {tasks.todo}
              </List>
            </Box>
            <Box>
              <Typography variant='h6'>Completed</Typography>
              <List
                onDrop={(e) => this.onDrop(e, "done")}
                onDragOver={(ev) => this.onDragOver(ev)}>
                {tasks.done}
              </List>
            </Box>
          </Stack>
        </Container>
      </ThemeProvider>
    );
  }
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
      border: '2px solid #45597E',
      borderBottom: 'none',
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
            ".MuiList-root": {
              padding: '40px 15px',
              backgroundColor: '#FBF2ED',
              border: '2px solid #45597E',
              ".MuiListItem-root": {
                marginBottom: '15px',
                fontFamily: 'sans-serif',
                fontWeight: '600',
                textAlign: 'center',
                color: '#45597E',
                border: '2px solid #45597E',
              },
            },
          },
        },
      },
    },
  },
});

export default DragDrop;