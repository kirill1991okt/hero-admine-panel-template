import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes.filter((hero) => hero.id !== action.payload);
    },
  },
});

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted,
} = heroesSlice.actions;

export const heroesSliceAll = heroesSlice;
export default heroesSlice.reducer;
