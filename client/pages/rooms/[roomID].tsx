import React from 'react';

import { GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import nookies from 'nookies';

import axios from 'axios';

import { firebaseAdmin } from '../../firebase.admin';

import socket from '../../socket';

import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from '@mui/material';

const RoomIDPage = ({ roomID, messages, email }: any) => {
  const [messagesArray, setMessagesArray] = React.useState(messages);

  const router = useRouter();

  const [inputText, setInputText] = React.useState('');

  React.useEffect(() => {
    socket.on('connect', () => {
      socket.emit('JOIN', roomID);
    });
  }, [roomID]);

  React.useEffect(() => {
    socket.on('message', ({ message, email, creatingTime, id }) => {
      setMessagesArray([
        { message, email, creating_time: creatingTime, id },
        ...messagesArray,
      ]);
    });
  }, [messagesArray]);

  const handleMessageSend = () => {
    if (inputText.length > 0) {
      socket.emit('ROOM:NEW_MESSAGE', { message: inputText, roomID, email });

      setInputText('');
      if (messagesArray.length === 0) {
        router.push(`/rooms/${roomID}`);
      }
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '30px' }}>
      <Grid container spacing={3} style={{ marginTop: '10px' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <TextField
            id="standard-basic"
            label="Write a message"
            variant="standard"
            style={{ width: '100%', marginRight: '5px' }}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              handleMessageSend();
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
      <Box style={{ height: '80vh', overflowY: 'auto', marginTop: '10px' }}>
        {messagesArray.length > 0 ? (
          messagesArray.map((message: any) => {
            return (
              <Typography
                variant="h6"
                component="p"
                key={message.creating_time}
              >
                {message.email}: {message.message}
              </Typography>
            );
          })
        ) : (
          <Typography variant="h6" component="h6">
            Start dialog
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default React.memo(RoomIDPage);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid, email } = token;

    const usersData: any = await axios.get(
      `http://127.0.0.1:4000/users/${uid}`
    );

    const userData = usersData.data.user;

    if (userData !== undefined && userData.length > 0) {
      if (userData[0].role === 'admin' || userData[0].role === 'user') {
        try {
          const result = await axios.get(
            `http://127.0.0.1:4000/rooms/${ctx.query.roomID}`
          );

          if (result.data.rooms.length > 0) {
            const messages = await axios.get(
              `http://127.0.0.1:4000/messages/${ctx.query.roomID}`
            );

            return {
              props: {
                roomID: ctx.query.roomID,
                messages: messages.data.messages.sort((a: any, b: any) =>
                  a.id > b.id ? -1 : 1
                ),
                email,
              },
            };
          }
          
          return {
            redirect: {
              permanent: false,
              destination: '/rooms',
            },
            props: {} as never,
          };
        } catch (e) {
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
