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

export const subscribeToUserAlbums = (
  user: User,
  onUpdate: (albums: DocumentData[]) => void
) => {
  const albumsRef = collection(db, 'users', user.uid, 'albums');

  const q = query(albumsRef);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const albums = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    onUpdate(albums);
  });

  return unsubscribe;
};

export const deleteUserAlbum = async (user: User, title: string) => {
  const albumsRef = collection(db, 'users', user.uid, 'albums');

  const q = query(albumsRef, where('title', '==', title));

  getDocs(q).then((snapshot) => {
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  });
};
