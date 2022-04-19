import { db } from 'api';
import { User } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export const createAlbum = async (user: User, title: string) => {
  const docRef = await addDoc(collection(db, 'users', user.uid, 'albums'), {
    title,
    createdAt: Date.now(),
  }).catch((error) => {
    console.error(error);
  });

  return docRef;
};

export const getUserAlbums = async (user: User) => {
  const albumsRef = collection(db, 'users', user.uid, 'albums');

  const q = query(albumsRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};
