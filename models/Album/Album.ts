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

export class Album {
  image?: string;
  constructor(
    public createdAt: number,
    public id: string,
    public title: string,
    public owner: User
  ) {}

  public async fetchPreview() {
    const images = collection(
      db,
      'users',
      this.owner.uid,
      'albums',
      this.id,
      'photos'
    );

    const imagesSnap = await getDocs(images);
    this.image = imagesSnap.docs.at(-1)?.data().url;

    return this.image;
  }

  public async delete() {
    const albumsRef = collection(db, 'users', this.owner.uid, 'albums');

    const q = query(albumsRef, where('title', '==', this.title));

    getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });
  }
}

export const subscribeToUserAlbums = (
  user: User,
  onUpdate: (albums: Promise<Album[]>) => void
) => {
  const albumsRef = collection(db, 'users', user.uid, 'albums');

  const q = query(albumsRef);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const albums = snapshot.docs.map(async (doc) => {
      const album = new Album(
        doc.data().createdAt,
        doc.id,
        doc.data().title,
        user
      );
      await album.fetchPreview();
      return album;
    });

    onUpdate(Promise.all(albums));
  });

  return unsubscribe;
};

export const createAlbum = async (user: User, title: string) => {
  const docRef = await addDoc(collection(db, 'users', user.uid, 'albums'), {
    title,
    createdAt: Date.now(),
  }).catch((error) => {
    console.error(error);
  });

  return docRef;
};
