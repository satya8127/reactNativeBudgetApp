import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { useIsFocused } from '@react-navigation/native';
import { clearBudget } from './redux/budgetSlice';


interface BudgetItem {
  id: number;
  category: string;
  alloted_amount: string;
  used_amount: string;
}

const BudgetList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const cartData = useSelector((state: RootState) => state.budget.budgetData);
  const isFocused = useIsFocused();

  const [cartItems, setCartItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setCartItems(cartData);
    }
  }, [cartData, isFocused]);


  const planned_sum = cartItems.reduce((sum, obj) => sum + Number(obj.alloted_amount), 0);
  const actual_sum = cartItems.reduce((sum, obj) => sum + Number(obj.used_amount), 0);
  const saving = actual_sum - planned_sum;
  const saving_balance = saving.toFixed(2);
  const handleEditItem = (itemId: number) => {
    console.log('printing itemId' + itemId);
    console.log('Cart items:', cartItems);
  
    const itemToEdit = cartItems.find((item) => item.id === itemId);
  
    console.log('Editing item:', itemToEdit);
  
    // Navigate to the edit screen with the selected item data
    navigation.navigate('EditBudgetItem', { isEdit: true, itemToEdit });
  };
  
  const dispatch = useDispatch();
  const savingColor = saving < 0 ? 'red' : 'green';
  const handleClearData = () => {
    // Dispatch the clearBudget action
    dispatch(clearBudget());
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity>
          <Text style={styles.heading}>Budget Entry Listing</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.upperTab}>
        <Text style={styles.tabText}>Category</Text>
        <Text style={styles.tabText}>Alloted</Text>
        <Text style={styles.tabText}>Used</Text>
        <Text style={styles.tabText}>Actions</Text>
      </View>
      <FlatList
  data={cartItems}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View key={item.id} style={styles.box}>
      <Text style={styles.boxText}>{item.category}</Text>
      <Text style={styles.boxText}>₹{item.alloted_amount}</Text>
      <Text style={styles.boxText}>₹{item.used_amount}</Text>
      <TouchableOpacity onPress={() => handleEditItem(item.id)}>
        <Text style={[styles.boxText, { color: 'blue' }]}>Edit</Text>
      </TouchableOpacity>
    </View>
  )}
/>
      

      <View style={styles.summary}>
        <Text style={[styles.savingBalance, { color: savingColor }]}>
          SAVEINGS : ₹{saving_balance}
        </Text>
      </View>
    
      <TouchableOpacity onPress={handleClearData} style={styles.clearButton}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Clear Data</Text>
      </TouchableOpacity>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  card: {
    backgroundColor: 'turquoise',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  heading: {
    fontSize: 21,
    fontWeight: '800',
    margin: 13,
    color: 'white',
  },
  upperTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.8,
    borderBottomColor: 'black',
    paddingVertical: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    alignItems: 'center',
    borderTopWidth: 2,
    marginTop: 20,
    paddingTop: 10,
    // borderBlockColor: '#ffffff'
  },
  summaryText: {
   
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  
  savingBalance: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default BudgetList;