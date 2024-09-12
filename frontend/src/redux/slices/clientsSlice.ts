import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClients = createAsyncThunk(
  'fetchClients',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/clients');
      return response.data.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Error getting clients');
    }
  }
);

interface ClientsState {
  selectedClientFilter: string;
  clients: object[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  selectedClientFilter: '',
  clients: [],
  loading: false,
  error: null,

};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedClientFilter: (state, action) => {
      state.selectedClientFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Manejando los estados del asyncThunk
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedClientFilter } = clientsSlice.actions;

export default clientsSlice.reducer;