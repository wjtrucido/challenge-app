import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAvailableTimes = createAsyncThunk(
  'fetchAvailableTimes',
  async (date: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/reservations/available-times?date=${date}`);
      console.log("esta es la hora response: ", response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Error getting availableTimes');
    }
  }
);

interface AvailableTime {
  startTime: string;
  endTime: string;
}

interface AvailableTimesState {
  availableTimes: AvailableTime[];
  loading: boolean;
  error: string | null;
}

const initialState: AvailableTimesState = {
  availableTimes: [],
  loading: false,
  error: null,
};

const AvailableTimesSlice = createSlice({
  name: 'AvailableTimes',
  initialState,
  reducers: {
    setAvailableTimes(state, action) {
      console.log("Action Payload:", action.payload);
      state.availableTimes = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTimes.fulfilled, (state, action) => {
        state.availableTimes = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailableTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAvailableTimes } = AvailableTimesSlice.actions;

export default AvailableTimesSlice.reducer;