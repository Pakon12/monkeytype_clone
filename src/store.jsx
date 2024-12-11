import { configureStore } from '@reduxjs/toolkit'
import textReducer  from './features/Statetext/textSlice'
import chooseTimeReducer from './features/choose/chooseTimeSlice'
import chooseWordReducer from './features/choose/chooseWordSlice'

export const store = configureStore({
  reducer: {
    text: textReducer,
    chooseTime: chooseTimeReducer,
    chooseWord: chooseWordReducer
  },
})