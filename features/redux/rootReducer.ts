
import budgetReducer from './budgetSlice';


import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  budget: budgetReducer,
  
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
