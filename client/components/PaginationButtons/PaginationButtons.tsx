import React from 'react';

import { Pagination, PaginationItem, Stack, Grid } from '@mui/material';

import { ArrowBack, ArrowForward } from '@mui/icons-material';

const PaginationButtons = ({ countOfThePages, page, handleChange }: any) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ marginTop: '20px', marginBottom: '20px' }}
    >
      <Stack spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={countOfThePages}
          page={page}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowBack,
                next: ArrowForward,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </Grid>
  );
};

export default React.memo(PaginationButtons);
