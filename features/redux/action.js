// budgetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    budgetData: [],
  },
  reducers: {
    addToBudget: (state, action) => {
      state.budgetData = [...state.budgetData, action.payload];
    },
    updateBudgetItem: (state, action) => {
      state.budgetData = state.budgetData.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { addToBudget, updateBudgetItem } = budgetSlice.actions;
export default budgetSlice.reducer;
