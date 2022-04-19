import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxxNbOhBjRUROJnbVPYu2GllMj_6mOn3s',
  authDomain: 'react-album-3e012.firebaseapp.com',
  projectId: 'react-album-3e012',
  storageBucket: 'react-album-3e012.appspot.com',
  messagingSenderId: '394199623538',
  appId: '1:394199623538:web:706e82b4abfb5ae00f1feb',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
auth.useDeviceLanguage();
