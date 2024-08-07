import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useTaskViewModel } from '../ViewModels/TaskViewModel';
import TaskList from '../View/TaskList';

const TaskScreen = () => {
  const [title, setTitle] = useState('');
  const {tasks, addTask, } = useTaskViewModel();

  const handleAddTask = async () => {
    addTask(title)
    setTitle('')
    ///////////yorum satırı eklenimesi lazım
  }
  

  
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:3,backgroundColor:'yellow'}}>
        <TaskList tasks={tasks}/>

      </View>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <TextInput 
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Yeni Görev"
        />

        
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={{fontSize:20}}>+</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default TaskScreen

const styles = StyleSheet.create({

  input:{
    height:45,
    width:'80%',
    borderRadius:15,
    borderWidth:2,
    margin:10,
    fontSize:15,
  },
  button:{
    height:40,
    width:40,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'lightblue'
  },

})