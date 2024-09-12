import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";

interface ReservationData {
  clientId: string;
  serviceId: string;
  date: string;
  hour: string;
}

export const createReservation = createAsyncThunk(
  'createReservation',
  async (reservationData: ReservationData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/reservations', reservationData);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Error when trying to create reservation');
    }
  }
);

export const cancelReservation = createAsyncThunk(
  'cancelReservation',
  async ({ id, reservationData }: { id: string; reservationData: ReservationData }, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:5000/reservations/${id}`, reservationData);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Error when trying to cancel the reservation');
    }
  }
);

export const updateReservation = createAsyncThunk(
  'updateReservation',
  async ({ id, reservationData }: { id: string; reservationData: ReservationData }, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:5000/reservations/${id}`, reservationData);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('Error when trying to update the reservation');
    }
  }
);

interface ReservationState {
  selectedClient: string | null;
  selectedService: string | null;
  selectedClientId: string | null;
  selectedServiceId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  reservationId: string | null;
  reservation: object | null;
  reservations: object[] | null;
  clients: string[];
  services: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  selectedClient: null,
  selectedService: null,
  selectedClientId: null,
  selectedServiceId: null,
  selectedDate: null,
  selectedTime: null,
  reservationId: null,
  reservation: null,
  reservations: null,
  clients: [],
  services: [],
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setClient(state, action: PayloadAction<string | null>) {
      state.selectedClient = action.payload;
    },
    setServiceId(state, action: PayloadAction<string | null>) {
      state.selectedServiceId = action.payload;
    },
    setClientId(state, action: PayloadAction<string | null>) {
      state.selectedClientId = action.payload;
    },
    setService(state, action: PayloadAction<string | null>) {
      state.selectedService = action.payload;
    },
    setDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
    setTime(state, action: PayloadAction<string | null>) {
      state.selectedTime = action.payload;
    },
    setClients(state, action: PayloadAction<string[]>) {
      state.clients = action.payload;
    },
    setSelectedReservationId(state, action: PayloadAction<string | null>) {
      state.reservationId = action.payload;
    },
    resetReservation: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
        toast.success('Reservación creada con éxito');
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(cancelReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
        toast.success('Reservación cancelada con éxito');
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
        toast.success('Reservación actualizada con éxito');
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setClient, setService, setDate, setTime, setClients, setClientId, setServiceId, setSelectedReservationId, resetReservation } = reservationSlice.actions;

export default reservationSlice.reducer;