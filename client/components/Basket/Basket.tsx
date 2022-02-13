import React from 'react';

import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';

import {
  Typography,
  Drawer,
  Divider,
  IconButton,
  Card,
  Box,
  CardContent,
} from '@mui/material';

import { ShoppingBasket, DeleteForever } from '@mui/icons-material';

import Grid from '@material-ui/core/Grid';
import { RootState } from '../../redux';
import { setBasketItems } from '../../redux/basketSlice';

import i1 from '../../public/images/1.jpeg';
import i2 from '../../public/images/2.jpg';
import i3 from '../../public/images/3.jpg';

const basketMenu = ({
  toggleDrawer,
  handleDeleteBasketItem,
  sum,
  basketItems,
  isOpenBasket,
  setIsOpenBasket,
}: any) => (
  <>
    <Box
      role="presentation"
      onKeyDown={toggleDrawer(setIsOpenBasket, isOpenBasket)}
      style={{ minWidth: '300px', maxWidth: '400px' }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        style={{ margin: '0 0 0 10px' }}
      >
        Sum: {sum.toFixed(2)}₽
      </Typography>
      <Divider />
      {basketItems !== null &&
        basketItems.map((el: any) => {
          return (
            <Card style={{ margin: '10px' }} key={el.id}>
              <CardContent>
                <Image
                  src={
                    el.type === 'bicycles' ? i1 : el.type === 'games' ? i2 : i3
                  }
                  alt="title"
                  height={'80px'}
                  width={'80px'}
                />
                <Typography gutterBottom variant="h5" component="div">
                  {el.name}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xl={6}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography variant="h6">id{el.id}</Typography>
                    </Grid>
                    <Grid
                      item
                      xl={6}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Typography variant="h6">{el.price}₽</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xl={12}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <DeleteForever
                        style={{
                          fontSize: '30px',
                          cursor: 'pointer',
                          margin: '0 0 0 -6px',
                        }}
                        onClick={() => handleDeleteBasketItem(Number(el.id))}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          );
        })}
    </Box>
  </>
);

const Basket = ({ toggleDrawer }: any) => {
  const dispatch = useDispatch();

  const basketItems = useSelector(
    (state: RootState) => state.basketSlice.basketItems
  );

  const [sum, setSum] = React.useState(0);

  const [isOpenBasket, setIsOpenBasket] = React.useState(false);

  React.useEffect(() => {
    setSum(
      basketItems.reduce((acc: number, item: any) => {
        return acc + Number(item.price);
      }, 0)
    );
  }, [basketItems]);

  React.useEffect(() => {
    dispatch(
      setBasketItems({
        basketItems: JSON.parse(localStorage.getItem('basket') || '[]'),
      })
    );
  }, [dispatch]);

  const handleDeleteBasketItem = (id: number) => {
    const newBasketItems = basketItems.filter((el: any) => el.id !== id);

    dispatch(setBasketItems({ basketItems: newBasketItems }));

    localStorage.setItem('basket', JSON.stringify(newBasketItems));
  };

  return (
    <>
      <IconButton
        style={{
          color: 'inherit',
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: 5,
        }}
        onClick={toggleDrawer(setIsOpenBasket, isOpenBasket)}
      >
        <ShoppingBasket />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpenBasket}
        onClose={toggleDrawer(setIsOpenBasket, isOpenBasket)}
      >
        {basketMenu({
          toggleDrawer,
          handleDeleteBasketItem,
          sum,
          basketItems,
          isOpenBasket,
          setIsOpenBasket,
        })}
      </Drawer>
    </>
  );
};

export default React.memo(Basket);
