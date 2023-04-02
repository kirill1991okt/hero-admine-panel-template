import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    activeFiltersChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFiltersChanged,
} = filterSlice.actions;
export default filterSlice.reducer;
