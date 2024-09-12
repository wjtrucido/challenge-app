import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
  selectedClientFilter: string;
  selectedClientIdFilter: string;
  selectedDateFilter: string;
  selectedServiceFilter: string;
  selectedServiceIdFilter: string;
  selectedTimeFilter: string;
}

const initialState: FilterState = {
  selectedClientFilter: '',
  selectedClientIdFilter: '',
  selectedDateFilter: '',
  selectedServiceFilter: '',
  selectedServiceIdFilter: '',
  selectedTimeFilter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedClientFilter: (state, action) => {
      state.selectedClientFilter = action.payload;
    },
    setSelectedClientIdFilter: (state, action) => {
      state.selectedClientIdFilter = action.payload;
    },
    setSelectedDateFilter: (state, action) => {
      state.selectedDateFilter = action.payload;
    },
    setSelectedServiceFilter: (state, action) => {
      state.selectedServiceFilter = action.payload;
    },
    setSelectedServiceIdFilter: (state, action) => {
      state.selectedServiceIdFilter = action.payload;
    },
    setSelectedTimeFilter: (state, action) => {
      state.selectedTimeFilter = action.payload;
    },
    resetFilters: () => initialState
  }
});

export const {
  setSelectedClientFilter,
  setSelectedClientIdFilter,
  setSelectedDateFilter,
  setSelectedServiceFilter,
  setSelectedServiceIdFilter,
  setSelectedTimeFilter,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;