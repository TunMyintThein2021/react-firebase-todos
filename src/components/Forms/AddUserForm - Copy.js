import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { Box, Container } from '@mui/material';
import { FormControl, FormGroup, FormLabel, TextField, FormHelperText, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { firestoreDb } from '../../Services/Firebase';
import { addDoc, collection } from 'firebase/firestore';


const AddUserForm = () => {
  let css = Styles();
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange"
  });
  const { errors } = formState;

  const navigate = useNavigate();
  const usersCollectionRef = collection(firestoreDb, 'users');
  const onSubmit = (data) => {
    addDoc(usersCollectionRef, { name: data.name, email: data.email, age: data.age, });
    // const docRef = addDoc(collection(firestoreDb, "users"), {
    //   name: data.name, email: data.email, age: data.age,
    // });
    navigate("/");
    // console.log(data);
    alert(('AddUser is Successful !!'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={css.addUserForm}>
        <Container maxWidth="sm">
          <Typography variant="h2">Welcome to AddUserForm !</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <TextField
                  type="text"
                  label="Name"
                  size='small'
                  variant="outlined"
                  {...register("name", { required: true, pattern: /^[a-zA-Z _]+$/i, })}
                />
                {errors.name && <FormHelperText error>Name is required*</FormHelperText>}
              </FormGroup>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  label="Email"
                  size='small'
                  variant="outlined"
                  {...register("email", { required: true, pattern: /^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i, })}
                />
              </FormGroup>
              {errors.email && <FormHelperText error>Email is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Age</FormLabel>
                <TextField
                  type="number"
                  label="Age"
                  size='small'
                  variant="outlined"
                  {...register("age", { required: true, })}
                />
              </FormGroup>
              {errors.age && <FormHelperText error>Age is required*</FormHelperText>}
            </FormControl>
            <FormControl>
              <Button type='submit' variant="contained">Submit</Button>
            </FormControl>
          </form>
        </Container>
      </Box>
    </ThemeProvider>
  )
};

const theme = createTheme({
  typography: {
    h2: {
      marginBottom: '30px',
      fontSize: '1.5rem',
      fontWeight: '500',
    },
  },
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          marginBottom: '0',
          flexDirection: 'unset',
          alignItems: 'center',
          label: {
            width: '30%',
          },
          div: {
            width: '70%',
          },
        },
      },
    },
  },
});

const Styles = makeStyles({
  addUserForm: {
    padding: '30px 0',
  },
});

export default AddUserForm;