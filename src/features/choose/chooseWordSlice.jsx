import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: localStorage.getItem('setChoose-words') || '10',
};

export const chooseWordSlice = createSlice({
  name: 'chooseWord',
  initialState,
  reducers: {
    setChooseWord: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChooseWord } = chooseWordSlice.actions;
export const selectChooseWord = (state) => state.chooseWord.value;

export default chooseWordSlice.reducer;
