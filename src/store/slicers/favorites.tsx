import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ArtWork} from '../../hooks/types';

const initialState = {artworks: [] as ArtWork[]};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorite(state, action: PayloadAction<ArtWork>) {
      state.artworks = [...state.artworks, action.payload];
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.artworks = state.artworks.filter(
        artwork => artwork.id !== action.payload,
      );
    },
    resetFavorites: () => initialState,
  },
});

export const {setFavorite, resetFavorites, removeFavorite} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;