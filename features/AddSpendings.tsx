import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { addToBudget } from './redux/budgetSlice';

interface BudgetEntryProps {
  navigation: any; 
}
interface DropdownItemProps {
  label: string;
  value: string;
}

const BudgetEntry: React.FC<BudgetEntryProps> = ({ navigation }) => {
  const budgetCategoryData: DropdownItemProps[] = [
    { label: 'Education', value: 'Education' },
    { label: 'Grocery', value: 'Grocery' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Food', value: 'Food' },
  ];

  const [itemValue, setItemValue] = useState<string>('');
  const [allotedAmount, setPlannedAmount] = useState<string>('');
  const [usedAmount, setActualAmount] = useState<string>('');
  
  const dispatch = useDispatch();

  const storeData = () => {
    const inputData = {
      "id": Math.floor(Math.random() * 100),
      "category": itemValue || "", // Use an empty string as the default value
      "alloted_amount": allotedAmount,
      "used_amount": usedAmount
    };
    dispatch(addToBudget(inputData));
    console.log("Input Data:", inputData);
  };
  
  const addBudget = () => {
    storeData();
    setItemValue('');
    setActualAmount('');
    setPlannedAmount('');
    navigation.navigate('BudgetList');
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity>
          <Text style={styles.heading}>Budget Entry</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('./images/budgetimg.jpg')}
        style={styles.imageIcon}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.txt}>Select Items</Text>
        <TextInput
          style={styles.input}
        
         
          value={itemValue}
          onChangeText={(text) => setItemValue(text)}
          clearButtonMode='always'
        />

        <Text style={styles.txt}>Alloted Amount</Text>
        <TextInput
          style={styles.input}
        
          keyboardType='number-pad'
          value={allotedAmount}
          onChangeText={(text) => setPlannedAmount(text)}
          clearButtonMode='always'
        />

        <Text style={styles.txt}>Used Amount</Text>
        <TextInput
          style={styles.input}
        
          keyboardType='number-pad'
          value={usedAmount}
          onChangeText={(text) => setActualAmount(text)}
          clearButtonMode='always'
        />
      </View>
      <View style={styles.btn}>
        <Button  title='Save' onPress={() => addBudget()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    padding: 15,
    margin: 10,
  },
  input: {
    borderBottomWidth: 0.8,
    borderBottomColor: 'black',
    padding: 5,
    marginBottom: 10,
  },
  txt: {
    fontSize: 15,
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  btn: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  btn1:{
borderRadius:60
  },
  imageIcon: {
    resizeMode: 'center',
    width: 400,
    height: 250,
    borderRadius: 200 / 2,
    alignSelf: 'center',
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default BudgetEntry;