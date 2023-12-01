import React, { Dispatch, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { updateBudgetItem } from './redux/budgetSlice';
import { useDispatch } from 'react-redux'; 
import { AnyAction } from 'redux';

interface BudgetItem {
  id: number;
  category: string;
  alloted_amount: string;
  used_amount: string;
}

interface EditBudgetItemProps {
  route: any;
  navigation: any;
}

const EditBudgetItem: React.FC<EditBudgetItemProps> = ({ route, navigation }) => {
  const { isEdit, itemToEdit } = route.params || { isEdit: false, itemToEdit: { id: 0, category: '', planned_amount: '0', actual_amount: '0' } };
  const [editedItem, setEditedItem] = useState<BudgetItem>(itemToEdit);
  const dispatch: Dispatch<AnyAction> = useDispatch(); // Adjust the type of dispatch

  const handleSave = () => {
    dispatch(updateBudgetItem(editedItem)); // Dispatch the updateBudgetItem action
    navigation.goBack(); // Navigate back to the BudgetList screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{isEdit ? 'Edit Budget Item' : 'Add Budget Item'}</Text>
      <View style={styles.form}>
        <Text>Category:</Text>
        <TextInput
          style={styles.input}
          value={editedItem.category}
          onChangeText={(text) => setEditedItem({ ...editedItem, category: text })}
        />

        <Text>Planned Amount:</Text>
        <TextInput
          style={styles.input}
          value={editedItem.alloted_amount}
          onChangeText={(text) => setEditedItem({ ...editedItem, alloted_amount: text })}
        />

        <Text>Actual Amount:</Text>
        <TextInput
          style={styles.input}
          value={editedItem.used_amount}
          onChangeText={(text) => setEditedItem({ ...editedItem, used_amount: text })}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  heading: {
    fontSize: 21,
    fontWeight: '800',
    marginVertical: 20,
  },
  form: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'orangered',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditBudgetItem;
