import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import Image from 'next/image';

import axios from 'axios';

import { RootState } from '../../../redux';
import { setBasketItems } from '../../../redux/basketSlice';

import { CatalogTypes } from '../../../enums/catalog';
import { CountOfTheGoodsOnOnePage } from '../../../enums/page';

import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from '@mui/material';

import { ShoppingBasket, DeleteForever } from '@mui/icons-material';

import PaginationButtons from '../../../components/PaginationButtons/PaginationButtons';

import i1 from '../../../public/images/1.jpeg';
import i2 from '../../../public/images/2.jpg';
import i3 from '../../../public/images/3.jpg';

const Page = ({ products, page, countOfThePages }: any) => {
  const router = useRouter();

  const goods = router.query.goods;

  const dispatch = useDispatch();

  const basketItems = useSelector(
    (state: RootState) => state.basketSlice.basketItems
  );

  React.useEffect(() => {
    if (
      typeof goods === 'string' &&
      !Object.values(CatalogTypes).includes(goods as CatalogTypes)
    ) {
      router.push('/');
    }
  }, [goods, router]);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/catalog/${goods}/${page}`);
  };

  const handleAddBasketItem = (basketItem: any) => {
    const newBasketItems = [basketItem, ...basketItems];

    localStorage.setItem('basket', JSON.stringify(newBasketItems));

    dispatch(setBasketItems({ basketItems: newBasketItems }));
  };

  const handleDeleteBasketItem = (id: number) => {
    const newBasketItems = basketItems.filter((el: any) => el.id !== id);

    dispatch(setBasketItems({ basketItems: newBasketItems }));

    localStorage.setItem('basket', JSON.stringify(newBasketItems));
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: '30px' }}>
      <Grid container spacing={3} alignItems="center">
        {products.length > 0 ? (
          <>
            <PaginationButtons
              countOfThePages={countOfThePages}
              page={page}
              handleChange={handleChange}
            />
            {products.map((el: any) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  key={el.id}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Card sx={{ maxWidth: '345px' }}>
                    <CardContent>
                      <Image
                        src={
                          el.type === 'bicycles'
                            ? i1
                            : el.type === 'games'
                            ? i2
                            : i3
                        }
                        alt="title"
                      />
                      <Typography gutterBottom variant="h4" component="div">
                        {el.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="text.secondary"
                      >
                        {el.description}
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
                            <Typography variant="h5">{el.price}₽</Typography>
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
                              justifyContent: 'flex-end',
                            }}
                          >
                            {basketItems
                              .map((el: any) => el.id)
                              .includes(el.id) ? (
                              <DeleteForever
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                  handleDeleteBasketItem(Number(el.id))
                                }
                              />
                            ) : (
                              <ShoppingBasket
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleAddBasketItem(el)}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </>
        ) : (
          <div>Still not filled page</div>
        )}
      </Grid>
      {products.length > 0 && (
        <PaginationButtons
          countOfThePages={countOfThePages}
          page={page}
          handleChange={handleChange}
        />
      )}
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  const countOfTheGoods = await axios
    .get(`http://127.0.0.1:4000/catalog/${context.query.goods}/count`)
    .then((res) => res.data.count);

  const countOfThePages = Math.ceil(
    countOfTheGoods / CountOfTheGoodsOnOnePage.count
  );

  const goods = await axios
    .get(
      `http://127.0.0.1:4000/catalog/${context.query.goods}/${context.query.page}`
    )
    .then((res) => res.data.goods);

  return {
    props: {
      products: goods,
      page: +context.query.page,
      countOfThePages,
    },
  };
}

export default React.memo(Page);
