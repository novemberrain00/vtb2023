import { configureStore } from '@reduxjs/toolkit';
import routeTypeSlice from './redux/slices/routeTypeSlice';
import bankFiltersSlice from './redux/slices/bankFiltersSlice';


export const store = configureStore({
  reducer: {
    routes: routeTypeSlice,
    bankFilters: bankFiltersSlice
  },
})