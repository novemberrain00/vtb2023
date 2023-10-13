import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: false  //true - for person, false - for car
}

export const routeTypeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    changeType: (state) => {
      state.type = !state.type
    },
  },
})

export const { changeType } = routeTypeSlice.actions;

export default routeTypeSlice.reducer;