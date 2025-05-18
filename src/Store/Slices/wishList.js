
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], 
  },
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
    toggleItem: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((itemId) => itemId !== id);
      } else {
        state.items.push(id);
      }
    },
  },
});

export const { setWishlist, toggleItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
