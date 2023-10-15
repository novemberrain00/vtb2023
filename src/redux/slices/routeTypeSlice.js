import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSwitchOpened: false  
}

export const routeTypeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    openSwitch: (state) => {
      state.isSwitchOpened = !state.isSwitchOpened
    },
  },
})

export const { openSwitch } = routeTypeSlice.actions;

export default routeTypeSlice.reducer;