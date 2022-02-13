import React from 'react';

import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import { RootState } from '../../redux';

import isEmail from 'validator/lib/isEmail';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '../../firebase.client';

import {
  Typography,
  Button,
  Drawer,
  IconButton,
  ButtonGroup,
  Box,
  TextField,
} from '@mui/material';

import { Login, Logout } from '@mui/icons-material';



const enterMenu = ({
  isLoginForm,
  setIsLoginForm,
  email,
  setHasEmailError,
  setEmail,
  setTextCommonError,
  setHasPasswordError,
  textPasswordError,
  handleEnterButton,
  hasEmailError,
  textEmailError,
  password,
  setPassword,
  hasPasswordError,
  hasCommonError,
  textCommonError,
  setHasCommonError,
}: any) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
    >
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            variant={isLoginForm ? 'contained' : 'outlined'}
            onClick={() => setIsLoginForm(true)}
          >
            Sign In
          </Button>
          <Button
            variant={!isLoginForm ? 'contained' : 'outlined'}
            onClick={() => setIsLoginForm(false)}
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </Box>

      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => {
          setHasEmailError(false);
          setEmail(event.target.value);
          setHasCommonError(false);
          setTextCommonError('');
        }}
        type="email"
        error={hasEmailError}
        helperText={hasEmailError && textEmailError}
      />
      <TextField
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => {
          setHasPasswordError(false);
          setPassword(event.target.value);
          setHasCommonError(false);
          setTextCommonError('');
        }}
        error={hasPasswordError}
        helperText={hasPasswordError && textPasswordError}
        type="password"
      />
      <Button variant="contained" onClick={handleEnterButton}>
        {isLoginForm ? 'Sign in' : 'Sign up'}
      </Button>
      {hasCommonError && (
        <Typography variant="h6" component="h6">
          {textCommonError}
        </Typography>
      )}
    </Box>
  );
};

const Enter = ({ toggleDrawer }: any) => {
  const router = useRouter();

  const isAuth = useSelector((state: RootState) => state.authSlice.isAuth);

  const [isOpenLogin, setIsOpenLogin] = React.useState(false);

  const [email, setEmail] = React.useState<string>('');

  const [password, setPassword] = React.useState<string>('');

  const [hasEmailError, setHasEmailError] = React.useState<boolean>(false);

  const [hasPasswordError, setHasPasswordError] =
    React.useState<boolean>(false);

  const [textEmailError, setTextEmailError] = React.useState<string>('');

  const [textPasswordError, setPasswordEmailError] = React.useState<string>('');

  const [isLoginForm, setIsLoginForm] = React.useState<boolean>(true);

  const [hasCommonError, setHasCommonError] = React.useState<boolean>(false);

  const [textCommonError, setTextCommonError] = React.useState<string>('');

  const handleLogoutButton = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      router.push('/');
    });
  };

  const handleEnterButton = () => {
    const auth = getAuth();

    if (!isEmail(email)) {
      setHasEmailError(true);

      setTextEmailError('You have to write an email');
    }

    if (password.length < 6) {
      setHasPasswordError(true);

      setPasswordEmailError(
        'The length of the password must to be more than 6 symbols'
      );
    }

    if (!isEmail(email) || password.length < 6) {
      return;
    }

    if (isEmail(email) && password.length >= 6 && !isLoginForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsOpenLogin(false);
        })
        .catch((error) => {
          setHasCommonError(true);
          setTextCommonError(error.message);
        });
    } else if (isEmail(email) && password.length >= 6) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsOpenLogin(false);
        })
        .catch((error) => {
          setHasCommonError(true);
          setTextCommonError(error.message);
        });
    }
  };

  return (
    <>
      {isAuth ? (
        <IconButton
          style={{
            color: 'inherit',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={handleLogoutButton}
        >
          <Logout />
        </IconButton>
      ) : (
        <>
          <IconButton
            style={{
              color: 'inherit',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            onClick={toggleDrawer(setIsOpenLogin, isOpenLogin)}
          >
            <Login />
          </IconButton>
          <Drawer
            anchor="right"
            open={isOpenLogin}
            onClose={toggleDrawer(setIsOpenLogin, isOpenLogin)}
          >
            {enterMenu({
              isLoginForm,
              setIsLoginForm,
              email,
              setHasEmailError,
              setEmail,
              setTextCommonError,
              setHasPasswordError,
              textPasswordError,
              handleEnterButton,
              hasEmailError,
              textEmailError,
              password,
              setPassword,
              hasPasswordError,
              hasCommonError,
              textCommonError,
              setHasCommonError,
            })}
          </Drawer>
        </>
      )}
    </>
  );
};

export default React.memo(Enter);
