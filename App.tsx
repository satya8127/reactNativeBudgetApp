import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import BudgetEntry from './features/AddSpendings';
import BudgetList from './features/SpendingsList';
import EditBudgetItem from './features/EditBudgetItem';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { addToBudget } from './features/redux/budgetSlice';

type BudgetItem = {
  id: number;
  category: string;
  alloted_amount: string;
  used_amount: string;
};

type RootStackParamList = {
  BudgetEntry: undefined;
  BudgetList: undefined;
  EditBudgetItem: { isEdit: boolean; itemToEdit: BudgetItem };
};

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="BudgetEntry"
    activeColor="#ffffff"
    barStyle={styles.tabBar}
  >
    <Tab.Screen
      name="BudgetEntry"
      component={BudgetEntry}
      options={{
        tabBarLabel: 'Add',
      }}
    />
    <Tab.Screen
      name="BudgetList"
      component={BudgetList}
      options={{
         tabBarLabel: 'View',
      }}
    />
  </Tab.Navigator>
);

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadAsyncStorageData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('budgetData');
        if (savedData) {
          const parsedData: BudgetItem[] = JSON.parse(savedData);

          // Dispatch your existing actions with the loaded data
          parsedData.forEach((item: BudgetItem) => {
            dispatch(addToBudget(item)); 
          });
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadAsyncStorageData();
  }, [dispatch]);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabScreen"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EditBudgetItem" component={EditBudgetItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#3498db',
  },
});

export default App;
