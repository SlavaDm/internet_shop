import React from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../redux';

import {Backdrop, CircularProgress} from '@mui/material';


const SimpleBackdrop = ({ children }: any) => {
  const isLoaded = useSelector((state: RootState) => state.authSlice.isLoaded);

  return (
    <>
      {!isLoaded && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {children}
    </>
  );
};

export default React.memo(SimpleBackdrop)