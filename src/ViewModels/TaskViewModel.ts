
import React, { useEffect, useState } from 'react'
import firestore, { onSnapshot } from '@react-native-firebase/firestore'
import { Task } from '../models/TaskModel'
import { Alert } from 'react-native'

export const useTaskViewModel = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        firestore().collection('tasks').onSnapshot(snapshot => {
            const taskList: Task[] = snapshot.docs.map(doc => ({
              id: doc.id,
              ...(doc.data())
            }));
            setTasks(taskList);
            setLoading(false);
          }, error => {
            console.error('Error fetching tasks:', error);
            setLoading(false);
          });
      }, []);
      
    const addTask = async (title: string) => {
        if(title ===''){
            Alert.alert('boş görev')
            return
        }
        try {
           
            await firestore().collection('tasks').add({
                    title,
                    completed: false,
                });
            console.log('The task was successfully added ');

        } catch (error) {
            console.log('An error accurred while adding the task ', error);
        }
    };


    const changeTaskCompleted = async(taskId: string) => {
      try{
        const taskDoc = await firestore().collection('tasks').doc(taskId).get();
        if (!taskDoc.exists) {
          console.log('Görev bulunamadı');
          return;   
        }
        const currentCompleted = taskDoc.data()?.completed;
        const newCompleted = !currentCompleted;
        await firestore().collection('tasks').doc(taskId).update({
          completed: newCompleted,
        });
        console.log('The status of completion of the task has changed')
      }
      catch(error){
        console.log('The status of completion of the task has not changed',error)
      }
    }

    const removeTask = async(taskId:string) => {
      try{
        await firestore().collection('tasks').doc(taskId).delete()
        console.log('The task was successfully removed')
      }
      catch(error){
        console.log('An error accourred while removing the task',error)
      }
    }

    const updateTask = async(taskId:string, newTitle:string) => {
      try{
        await firestore().collection('tasks').doc(taskId).update({
          completed: newTitle,
        });
        console.log('The title has changed')
      }
      catch(error) {
        console.log('',error)
      }
    }

      return {tasks, loading, addTask, changeTaskCompleted,removeTask,updateTask}
}

