import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  boundCoords: []
}

export const boundsSlice = createSlice({
  name: 'bounds',
  initialState,
  reducers: {
    setBounds: (state, action) => {
      state.boundCoords = action.payload
    },
  },
})

export const { setBounds } = boundsSlice.actions;

export default boundsSlice.reducer;