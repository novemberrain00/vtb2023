import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banks: []
}

export const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    setBanks: (state, action) => {
      state = {...action.payload}
    },
  },
})

export const { setBanks } = banksSlice.actions;

export default banksSlice.reducer;