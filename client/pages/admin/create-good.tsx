import React from 'react';

import { GetServerSidePropsContext } from 'next';

import nookies from 'nookies';

import axios from 'axios';

import { firebaseAdmin } from '../../firebase.admin';

import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = token;

    const usersData: any = await axios.get(
      `http://127.0.0.1:4000/users/${uid}`
    );

    const userData = usersData.data.user;
    if (userData !== undefined && userData.length > 0) {
      if (userData[0].role === 'admin') {
        return {
          props: {},
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
          props: {} as never,
        };
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {} as never,
      };
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {} as never,
    };
  }
};

const CreateGood = () => {
  const [type, setType] = React.useState('clothes');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');

  const handleChange = (event: any, set: any) => {
    set(event.target.value);
  };

  const handleCreateButton = async () => {
    if (
      type.length > 0 &&
      name.length > 0 &&
      description.length > 0 &&
      Number.isInteger(Number(price)) &&
      Number(price) > 0
    ) {
      await axios.post(`http://127.0.0.1:4000/catalog`, {
        type,
        name,
        description,
        price: Number(price),
      });

      await axios.post(`http://127.0.0.1:4000/firebase/notification`, {
        type,
        name,
        description,
        price: Number(price),
      });

      setType('clothes');
      setName('');
      setPrice(0);
      setDescription('');
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '100px' }}>
      <Grid container spacing={3} alignItems="center">
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={type}
            onChange={(event) => handleChange(event, setType)}
          >
            <MenuItem value={'clothes'}>Clothes</MenuItem>
            <MenuItem value={'games'}>Games</MenuItem>
            <MenuItem value={'bicycles'}>Bicycles</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => handleChange(event, setName)}
          style={{ margin: '5px' }}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={price}
          onChange={(event: any) =>
            setPrice(event.target.value.replace(/[^0-9]/g, ''))
          }
          style={{ margin: '5px' }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(event) => handleChange(event, setDescription)}
          style={{ margin: '5px' }}
        />
        <Button
          variant="contained"
          onClick={handleCreateButton}
          style={{ margin: '5px' }}
        >
          Create
        </Button>
      </Grid>
    </Container>
  );
};

export default React.memo(CreateGood);
