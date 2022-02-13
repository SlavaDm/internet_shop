import React from 'react';

import { useRouter } from 'next/router';

import axios from 'axios';

import { Button, Grid, TextField } from '@mui/material';

const CreateRoom = () => {
  const [inputText, setInputText] = React.useState('');

  const router = useRouter();

  const handleCreateButton = async () => {
    if (inputText.length > 0) {
      await axios.post(`http://127.0.0.1:4000/rooms`, {
        name: inputText,
      });

      setInputText('');

      router.push(`/rooms`);
    }
  };

  return (
    <Grid container spacing={3} style={{ marginBottom: '10px' }}>
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
          label="Name of the new room"
          variant="standard"
          style={{ width: '100%', marginRight: '5px' }}
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleCreateButton();
          }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(CreateRoom);
