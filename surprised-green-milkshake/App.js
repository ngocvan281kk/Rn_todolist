
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Text, 
  Switch, 
  Picker, 
  ScrollView 
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('Personal');
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false, category }]);
    setTask('');
  };

  const toggleCompletion = (taskKey) => {
    setTasks(tasks.map(item => 
      item.key === taskKey ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTask = (taskKey) => {
    setTasks(tasks.filter(item => item.key !== taskKey));
  };

  const filteredTasks = searchQuery.trim() === '' 
    ? tasks 
    : tasks.filter(t => t.value.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TODO LIST</Text>

      {/* Search Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Tìm kiếm công việc" 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />

      {/* Category Picker */}
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="Nhanh" value="Nhanh" />
        <Picker.Item label="Chậm" value="Chậm" />
      </Picker>

      {/* Task Input and Add Button */}
      <TextInput 
        style={styles.input} 
        placeholder="Thêm công việc" 
        value={task} 
        onChangeText={setTask} 
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={addTask}
      >
        <Text style={styles.addButtonText}>ADD TASK</Text>
      </TouchableOpacity>

      {/* Task List */}
      <FlatList 
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={item.completed ? styles.completedTask : undefined}>
              {`[${item.category}] ${item.value}`}
            </Text>
            <View style={styles.actions}>
              <Switch 
                value={item.completed} 
                onValueChange={() => toggleCompletion(item.key)} 
              />
              <TouchableOpacity onPress={() => deleteTask(item.key)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    backgroundColor: '#9EDDFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#CDF5FD",
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
    color: "black",
  },
  addButton: {
    backgroundColor: 'black',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 5,
    backgroundColor: "lightgrey",
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    marginLeft: 10,
    color: 'black',
  },
});