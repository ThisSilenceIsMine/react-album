import { db } from 'api';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

export const createAlbum = async (user: User, title: string) => {
  const docRef = await addDoc(collection(db, 'users', user.uid, 'albums'), {
    title,
    createdAt: Date.now(),
  }).catch((error) => {
    console.error(error);
  });

  return docRef;
};
