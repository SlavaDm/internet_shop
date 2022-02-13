import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'user',
  initialState: {
    basketItems: [],
  },
  reducers: {
    setBasketItems(state: any, action: { payload: any }) {
      state.basketItems = [...action.payload.basketItems];
    },
  },
});

export default basketSlice.reducer;
export const { setBasketItems } = basketSlice.actions;
