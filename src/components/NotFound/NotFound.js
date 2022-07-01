import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';


const NotFound = () => {

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Container maxWidth="xs">
          <Typography variant="h2">Page Not Found !</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const theme = createTheme({
  typography: {
    h2: {
      position: 'absolute',
      top: '50%',
      fontSize: '1.5rem',
      fontWeight: '500',
      textAlign: 'center',
      transform: 'translate(50%, -50%)',
    },
  },
});

export default NotFound;