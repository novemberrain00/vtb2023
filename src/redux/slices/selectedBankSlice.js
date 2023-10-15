import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  address: '',
  metro: '',
  hasRamp: false,
  clientTypes: [],
  operatingModeResponse: [],
  coords: []
}

export const selectedBankSlice = createSlice({
  name: 'selectedBank',
  initialState,
  reducers: {
    setSelectedBank: (state, action) => {
        const { name, address, metro, hasRamp, clientTypes, operatingModeResponse, coords } = action.payload;

        state.name = name;
        state.address = address;
        state.metro = metro;
        state.hasRamp = hasRamp;
        state.clientTypes = clientTypes;
        state.operatingModeResponse= operatingModeResponse;
        state.coords = coords;
    },
  },
})

export const { setSelectedBank } = selectedBankSlice.actions;

export default selectedBankSlice.reducer;