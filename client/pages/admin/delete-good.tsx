import React from 'react';

import { GetServerSidePropsContext } from 'next';

import { useDispatch } from 'react-redux';

import { setBasketItems } from '../../redux/basketSlice';

import nookies from 'nookies';

import axios from 'axios';

import { firebaseAdmin } from '../../firebase.admin';

import { TextField, Button, Container, Grid } from '@mui/material';

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

const DeleteGood = () => {
  const dispatch = useDispatch();

  const [id, setID] = React.useState(0);

  const handleCreateButton = async () => {
    if (Number.isInteger(Number(id)) && Number(id) > 0) {
      await axios.delete(`http://127.0.0.1:4000/catalog/${id}`);

      const basketItems = JSON.parse(localStorage.getItem('basket') || '[]');

      const newBasketItems = basketItems.filter(
        (el: any) => el.id !== Number(id)
      );

      dispatch(setBasketItems({ basketItems: newBasketItems }));

      localStorage.setItem('basket', JSON.stringify(newBasketItems));

      setID(0);
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '100px' }}>
      <Grid container spacing={3} alignItems="center">
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          value={id}
          onChange={(event: any) =>
            setID(event.target.value.replace(/[^0-9]/g, ''))
          }
          style={{ margin: '5px' }}
        />

        <Button
          variant="contained"
          onClick={handleCreateButton}
          style={{ margin: '5px' }}
        >
          Delete
        </Button>
      </Grid>
    </Container>
  );
};

export default React.memo(DeleteGood);
