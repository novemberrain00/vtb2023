import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  coords: []
}

export const currentPositionSlice = createSlice({
  name: 'curPosition',
  initialState,
  reducers: {
    setCurPosition: (state, action) => {
      state.coords = action.payload
    },
  },
})

export const { setCurPosition } = currentPositionSlice.actions;

export default currentPositionSlice.reducer;