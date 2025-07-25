import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleMenuPress = menuName => console.log('Clicked:', menuName);

  const addTask = () => {
    if (task.trim() !== '') {
      setTaskList([...taskList, { text: task, done: false }]);
      setTask('');
    }
  };

  const toggleDone = index => {
    const newList = [...taskList];
    newList[index].done = !newList[index].done;
    setTaskList(newList);
  };

  const deleteTask = index => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
      {/* Sidebar */}
      <View style={styles.sidebarContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />

        <View style={styles.usernameContainer}>
          <Text style={{ color: 'white' }}>@User_name</Text>
        </View>

        <View style={styles.sidebar}>
          {['Tasks', 'Challenges', 'Learnings', 'Progress'].map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => handleMenuPress(item)}
            >
              <Text style={styles.menuItem}>• {item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Area */}
      <View style={styles.main}>
        <Text style={styles.heading}>   Today's Tasks</Text>

        {/* Task List */}
        <ScrollView style={styles.taskList}>
          {taskList.map((item, index) => (
            <View key={index} style={styles.taskItem}>
              <Text
                style={{
                  color: item.done ? 'gray' : 'black',
                  textDecorationLine: item.done ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </Text>

              <View style={styles.taskActions}>
                <TouchableOpacity onPress={() => toggleDone(index)}>
                  <Text>{item.done ? '❌' : '✔️'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <Text> ✂️ </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Task"
            value={task}
            onChangeText={text => setTask(text)}
          />
          <TouchableOpacity onPress={addTask}>
            <Text style={styles.addButton}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 100,
    backgroundColor: '#0C2D5D',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    borderRadius: 50,
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  usernameContainer: {
    backgroundColor: '#0C2D5D',
    height: 50,
    width: 90,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sidebar: {
    backgroundColor: '#0C2D5D',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 10,
    flex: 1,
  },
  menuItem: {
    color: '#E3EDFD',
    fontSize: 14,
    marginBottom: 15,
  },
  main: {
    flex: 1,
    backgroundColor: '#E5EDF9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'space-between',
    marginBottom:25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    fontSize: 22,
    paddingHorizontal: 10,
    color: 'green',
  },
  taskList: {
    flex: 1,
    marginVertical: 10,
  },
  taskItem: {
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 10,
  },
});
