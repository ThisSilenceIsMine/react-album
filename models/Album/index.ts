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
  onUpdate: (albums: Promise<DocumentData[]>) => void
) => {
  const albumsRef = collection(db, 'users', user.uid, 'albums');

  const q = query(albumsRef);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const albums = snapshot.docs.map(async (doc) => ({
      ...doc.data(),
      id: doc.id,
      preview: await loadAlbumPreview(user, doc.id),
    }));

    onUpdate(Promise.all(albums));
  });

  return unsubscribe;
};

export const loadAlbumPreview = async (user: User, album: string) => {
  const images = collection(db, 'users', user.uid, 'albums', album, 'photos');

  const imagesSnap = await getDocs(images);

  return imagesSnap.docs
    .slice(0, -1)
    .map((doc) => doc.data())
    .at(0);
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
