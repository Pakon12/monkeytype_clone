import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: localStorage.getItem('setChoose-time') || '15',
};

export const chooseTimeSlice = createSlice({
  name: 'chooseTime',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTime } = chooseTimeSlice.actions;

export const selectChooseTime = (state) => state.chooseTime.value;

export default chooseTimeSlice.reducer;

