import React from 'react';

import { GetServerSidePropsContext } from 'next';

import nookies from 'nookies';

import axios from 'axios';

import { firebaseAdmin } from '../../firebase.admin';

import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

import CreateRoom from '../../components/CreateRoom';

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
      if (userData[0].role === 'admin' || userData[0].role === 'user') {
        const result = await axios.get(`http://127.0.0.1:4000/rooms`);
        return {
          props: { rooms: result.data },
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

const RoomsPage = ({ rooms }: any) => {

  const handleChangeRouter = (id: number) => {
    window.location.href = `/rooms/${id}`;
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '100px' }}>
      <CreateRoom />
      <Grid container spacing={3}>
        {rooms.length > 0 &&
          rooms.map((el: any) => {
            return (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={2}
                xl={2}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  cursor: 'pointer',
                }}
                key={el.id}
              >
                <Card
                  sx={{
                    width: '100%',
                    minHeight: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardContent
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    onClick={() => handleChangeRouter(el.id)}
                  >
                    <Typography variant="h6" component="h6">
                      {el.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      id: {el.id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default React.memo(RoomsPage);
