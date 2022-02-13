import React from 'react';

import Link from 'next/link';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import Enter from './Enter/Enter';
import Basket from './Basket/Basket';
import Catalog from './Catalog/Catalog';

const NavBar = () => {
  const toggleDrawer =
    (set: any, val: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      set(!val);
    };

  return (
    <Box sx={{ flexGrow: 1, marginTop: '64px' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#42a5f5' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Catalog toggleDrawer={toggleDrawer} />
            <Link href={'/'} passHref>
              <Button color="inherit">Home</Button>
            </Link>
          </Typography>
          <Enter toggleDrawer={toggleDrawer} />
          <Basket toggleDrawer={toggleDrawer} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default React.memo(NavBar);
