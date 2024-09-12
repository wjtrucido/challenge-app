import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReservations = createAsyncThunk(
  'fetchReservations',
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/reservations?page=${page}&limit=10`);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Error getting reservations');
    }
  }
);

interface ReservationsState {
  countPages: number;
  reservations: object;
  loading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  countPages: 1,
  reservations: {
    data: [],
    totalItems: 0,
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setCountPages(state, action) {
      state.countPages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.countPages = Math.ceil(action.payload.totalPages);
        state.loading = false;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCountPages } = reservationsSlice.actions;

export default reservationsSlice.reducer;