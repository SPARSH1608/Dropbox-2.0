import { getApp, getApps, initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDnTr4vGG4Y0NA3iwixfHXQz1EXGvdGxtc',
  authDomain: 'dropbox-8ec59.firebaseapp.com',
  projectId: 'dropbox-8ec59',
  storageBucket: 'dropbox-8ec59.appspot.com',
  messagingSenderId: '907733441799',
  appId: '1:907733441799:web:9f5cdf3181243b5994f9a2',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);
export { db, storage };
