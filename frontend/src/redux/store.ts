import { configureStore } from '@reduxjs/toolkit';
import availableTimesReducer from './slices/availableTimesSlice';
import clientsReducer from './slices/clientsSlice';
import filterReducer from './slices/filterSlice';
import reservationReducer from './slices/reservationSlice';
import reservationsReducer from './slices/reservationsSlice';
import servicesReducer from './slices/servicesSlice';

const store = configureStore({
  reducer: {
    availableTimes: availableTimesReducer,
    clients: clientsReducer,
    filter: filterReducer,
    reservation: reservationReducer,
    reservations: reservationsReducer,
    services: servicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;