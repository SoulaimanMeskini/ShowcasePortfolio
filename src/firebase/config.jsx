import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB9WCOHHYNfX9t9gNmf1fnA7is2RYrPXpQ",
  authDomain: "shocase-portfolio.firebaseapp.com",
  projectId: "shocase-portfolio",
  storageBucket: "shocase-portfolio.appspot.com",
  messagingSenderId: "520216889411",
  appId: "1:520216889411:web:ef199543f753bbb29d2cf6",
  measurementId: "G-HSP017JMB9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
