import { db } from 'api';
import { User } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export const createAlbum = async (user: User, title: string) => {
  const docRef = await addDoc(collection(db, 'albums'), {
    title,
    createdAt: Date.now(),
    owner: user.uid,
  }).catch((error) => {
    console.error(error);
  });

  return docRef;
};

export const getUserAlbums = async (user: User) => {
  const albumsRef = collection(db, 'albums');

  const q = query(albumsRef, where('owner', '==', user.uid));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};
