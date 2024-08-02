import firestore from '@react-native-firebase/firestore'

export interface Task {
    id: string;
    title: string;
    completed: boolean;
  }