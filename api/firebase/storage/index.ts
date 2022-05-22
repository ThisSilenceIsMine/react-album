import { AlertTitleProps } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PhotoWrapper } from 'models/Photo/Photo';
import { db, storage } from '../firebase';

export const uploadImage = async (
  user: User,
  album: string,
  image: PhotoWrapper
) => {
  if (!image.file) return false;
  const fileName = image.title ?? image.file.name;
  const imageRef = ref(storage, `${user.uid}/${album}/${image.file.name}`);

  await uploadBytes(imageRef, image.file);
  const url = await getDownloadURL(imageRef);

  const image_1 = {
    url,
    description: image.description,
    title: fileName,
    createdAt: Date.now(),
    owner: user.uid,
  };
  addDoc(collection(db, 'users', user.uid, 'albums', album, 'photos'), image_1);

  return true;
};

export const getImages = async (
  user: User,
  album: string,
  onUpdate: (images: DocumentData[]) => void
) => {
  const images = collection(db, 'users', user.uid, 'albums', album, 'photos');

  const q = query(images);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const images = snapshot.docs.map((doc) => doc.data());

    onUpdate(images);
  });

  return unsubscribe;
};

export const updateImage = async (
  user: User,
  album: string,
  image: string,
  data: Partial<PhotoWrapper>
) => {
  const images = collection(db, 'users', user.uid, 'albums', album, 'photos');

  const q = query(images, where('title', '==', image));

  getDocs(q).then((snap) => {
    snap.docs.forEach((doc) => {
      updateDoc(doc.ref, data);
    });
  });
};
