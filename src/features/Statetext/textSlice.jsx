import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setText } = textSlice.actions

export const selectText = (state) => state.text.value

export default textSlice.reducer
