import { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskCounter, setTaskCounter] = useState(0);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask('');
      setTaskCounter(taskCounter + 1); // Incrementar el contador al agregar una tarea
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((item) => item.id !== taskId));
    setTaskCounter(taskCounter > 0 ? taskCounter - 1 : 0); // Disminuir el contador al eliminar una tarea
  };

  const incrementCounter = () => {
    setTaskCounter(taskCounter + 1);
  };

  const decrementCounter = () => {
    if (taskCounter > 0) {
      setTaskCounter(taskCounter - 1);
    }
  };

  const renderHeader = () => (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Contador de Tareas */}
      <ThemedView style={styles.counterContainer}>
        <ThemedText type="subtitle">Contador de Tareas</ThemedText>
        <View style={styles.counterControls}>
          <TouchableOpacity style={styles.counterButton} onPress={decrementCounter}>
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterValue}>{taskCounter}</Text>
          <TouchableOpacity style={styles.counterButton} onPress={incrementCounter}>
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Lista de Tareas */}
      <ThemedView style={styles.taskContainer}>
        <ThemedText type="subtitle">Lista de Tareas</ThemedText>
        <TextInput
          placeholder="Añadir nueva tarea"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Button title="Añadir Tarea" onPress={addTask} />
      </ThemedView>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text>{item.text}</Text>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Text style={styles.deleteButton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 50,
  },
  taskContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  counterContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  counterButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
