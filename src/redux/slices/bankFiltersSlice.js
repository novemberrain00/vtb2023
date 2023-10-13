import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clientsType: []
}

export const bankFiltersSlice = createSlice({
  name: 'bankFilters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state = {...action.payload}
      console.log(state)
    },
  },
})

export const { setFilters } = bankFiltersSlice.actions;

export default bankFiltersSlice.reducer;