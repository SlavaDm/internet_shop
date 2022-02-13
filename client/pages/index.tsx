import React from 'react';

import type { NextPage } from 'next';

import { Box, Typography } from '@mui/material';

import style from './index.module.scss';

const Home: NextPage = (page: any) => {
  return (
    <Box
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#84c7fd',
      }}
      className={style.box}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        Internet shop
      </Typography>
    </Box>
  );
};

export default React.memo(Home);
