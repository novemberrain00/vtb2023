import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    branchServices:{}
  },
  filtersToSend: {}
}

export const bankFiltersSlice = createSlice({
  name: 'bankFilters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const services = Object.keys(action.payload).filter(key => !'branchServiceshasRampholidayWorkinghasPrime'.includes(key));
      state.filters = action.payload;
      state.filters.branchServices = services;
    },
    sendFilters: (state, action) => {
      state.filtersToSend = action.payload;
    },
  },
})

export const { setFilters, sendFilters } = bankFiltersSlice.actions;

export default bankFiltersSlice.reducer;