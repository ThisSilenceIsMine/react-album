import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Photo } from 'models/Photo/Photo';
import { db, storage } from '../firebase';

export const uploadImage = async (user: User, album: string, image: Photo) => {
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
