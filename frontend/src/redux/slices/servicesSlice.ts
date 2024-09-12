import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServices = createAsyncThunk(
  'fetchServices',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/services');
      return response.data.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Error getting services');
    }
  }
);

interface Service {
  id: string;
  descripcion: string;
}

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Manejando los estados del asyncThunk
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default servicesSlice.reducer;