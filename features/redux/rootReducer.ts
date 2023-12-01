
import budgetReducer from './budgetSlice';


import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  budget: budgetReducer,
  // ... other reducers if any
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
