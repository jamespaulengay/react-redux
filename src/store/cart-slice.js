import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      // 1) Reference newItem from action.payload
      const newItem = action.payload;

      // 2) Find existing item if already exists.
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // 2.a) Increment Total Quantity
      state.totalQuantity++;

      // 2.b) For avoiding sending two Http Request.
      state.changed = true;

      // 3) If there is no existing item, create a new item on the items[] list.
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1, // New item starts with a quantity of '1'.
          totalPrice: newItem.price, // New item starts with the started price.
          name: newItem.title,
        });
      } else {
        // 4) else, increment item quantity and price.
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
    },
    removeItemFromCart(state, action) {
      // 1) Copy item.id from action.payload
      const id = action.payload;

      // 2) Find existing item with that id.
      const existingItem = state.items.find((item) => item.id === id);

      // 2) Decrement TotalQuantity
      state.totalQuantity--;

      // 2.a) For avoiding sending two Http Request.
      state.changed = true;

      // 3) If existing item.quantity === '1', remove that item from items[] list
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        // 4) Decrement-- item.quantity and price
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice.reducer;
