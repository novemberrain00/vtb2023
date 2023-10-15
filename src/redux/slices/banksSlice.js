import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banks: [],
  atm: []
}

export const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    setBanks: (state, action) => {
      state.banks = {...action.payload}
    },
    setAtm: (state, action) => {
      state.atm = {...action.payload}
    },
  },
})

export const { setBanks, setAtm } = banksSlice.actions;

export default banksSlice.reducer;