import { configureStore } from '@reduxjs/toolkit';

import routeTypeSlice from './redux/slices/routeTypeSlice';
import bankFiltersSlice from './redux/slices/bankFiltersSlice';
import banksSlice from './redux/slices/banksSlice';
import currentPositionSlice from './redux/slices/currentPositionSlice';
import boundsSlice from './redux/slices/boundsSlice';

export const store = configureStore({
  reducer: {
    routes: routeTypeSlice,
    bankFilters: bankFiltersSlice,
    banks: banksSlice,
    curPosition: currentPositionSlice,
    bounds: boundsSlice
  },
});