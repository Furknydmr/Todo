import { 
  ActivityIndicator, 
  FlatList, 
  Modal, 
  Pressable, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native'
import React, { useState } from 'react'
import { Task } from '../models/TaskModel';
import { useTaskViewModel } from '../ViewModels/TaskViewModel';



const TaskList: React.FC<Task[]> = ({tasks}) => {
  const {changeTaskCompleted,removeTask, updateTask, loading} = useTaskViewModel();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('')

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{flex:1,justifyContent:'center'}} />;
  }

    const renderItem = ({ item }: { item: Task }) => (
        <TouchableOpacity 
        style={[styles.taskItem,{backgroundColor:item.completed ? 'red' : '#e0f7fa'}]} 
        onPress={()=>changeTaskCompleted(item.id)}
        >
          <View style={{flex:1,}}>
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
          <View style={{justifyContent:'flex-end', flexDirection:'row', alignItems:'center'}}>
            <Pressable 
            style={styles.pressable}
            onPress={() => {setIsModalVisible(true), item.id}}
            >
              <Text style={{marginLeft:4,marginRight:4}}>Düzenle</Text>
            </Pressable>
            <Pressable 
            style={styles.pressable}
            onPress={() => removeTask(item.id)}
            >
            <Text style={{marginLeft:4,marginRight:4}}>Sil</Text>
            </Pressable>
          </View>
          
          
        </TouchableOpacity>
      );
    
  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    ) : (
      <TouchableOpacity style={styles.taskItem}>
          <Text style={styles.taskText}>Bir Görev Ekleyerek Başla</Text>
        </TouchableOpacity>
    )}

    <Modal
    transparent={true}
    visible={isModalVisible}
    animationType="fade"
    onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <TextInput 
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
        placeholder='yenigörev'
        />

        
        <TouchableOpacity style={styles.button}>
          <Text style={{fontSize:20}}>Kaydet</Text>
        </TouchableOpacity>

      </View>
    </Modal>
    </View>
  )
}

export default TaskList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
      },
      taskItem: {
        flex:1,
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection:'row',
      },
      taskText: {
        fontSize: 18,
        color: 'black',
      },
      pressable:{
        height:'90%',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        margin:3,
      },
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