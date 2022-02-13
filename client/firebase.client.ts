import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
} from 'firebase/auth';

import { getDatabase, ref } from 'firebase/database';

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { getToken, onMessage } from 'firebase/messaging';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyB_xAGiIn7samIH2Eh7IV2YH6Ag1NcVj8A',
  authDomain: 'nextjs-1cc28.firebaseapp.com',
  projectId: 'nextjs-1cc28',
  storageBucket: 'nextjs-1cc28.appspot.com',
  messagingSenderId: '958624697513',
  appId: '1:958624697513:web:fb36fdb3ef3e3d16b6edb8',
});

export const messaging = getMessaging(firebaseApp);

export const getTokens = async () => {
  let currentToken = '';

  try {
    currentToken = await getToken(messaging, {
      vapidKey:
        'BClmjJUBMGUYFF5xqQGJ5P5spvD5Dn9rmkX0ohmGE5iRLBUgmtrQTMsZFas0efVaZa3iuLPajOhz4J0HZM2wACI',
    });
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }

  return currentToken;
};

export default firebase;

export {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
  getDatabase,
  ref,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
};
