import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0
}

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    }
  }
})

export const { increment, decrement, reset } = summarySlice.actions

export default summarySlice.reducer
