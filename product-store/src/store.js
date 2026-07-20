import { configureStore, createSlice } from "@reduxjs/toolkit";

// Simple Redux slice to manage favorite product IDs (LO8)
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // Array of product IDs
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter((id) => id !== productId);
      } else {
        state.items.push(productId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

export default store;
