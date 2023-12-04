// budgetSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BudgetItem {
  id: number;
  category: string;
  alloted_amount: string;
  used_amount: string;
  
}

interface BudgetState {
  budgetData: BudgetItem[];
}

const budgetSlice = createSlice({
  name: 'budget',
  initialState: { budgetData: [] } as BudgetState,
  reducers: {
    addToBudget: (state, action: PayloadAction<BudgetItem>) => {
      const newBudgetData = [...state.budgetData, action.payload];
      state.budgetData = newBudgetData;

      // Use AsyncStorage.setItem with promise handling
      AsyncStorage.setItem('budgetData', JSON.stringify(newBudgetData))
        .then(() => console.log('Data saved successfully'))
        .catch((error) => console.error('Error saving data:', error));
    },
    
    updateBudgetItem: (state, action: PayloadAction<BudgetItem>) => {
      const { id } = action.payload;
      const updatedBudgetData = state.budgetData.map((item) =>
        item.id === id ? action.payload : item
      );
      state.budgetData = updatedBudgetData;

      // Use AsyncStorage.setItem with promise handling
      AsyncStorage.setItem('budgetData', JSON.stringify(updatedBudgetData))
        .then(() => console.log('Data updated successfully'))
        .catch((error) => console.error('Error updating data:', error));
    },
    
    clearBudget: (state) => {
      state.budgetData = [];

      // Use AsyncStorage.removeItem with promise handling
      AsyncStorage.removeItem('budgetData')
        .then(() => console.log('Data cleared successfully'))
        .catch((error) => console.error('Error clearing data:', error));
    },
  },
});

export const { addToBudget, updateBudgetItem, clearBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
