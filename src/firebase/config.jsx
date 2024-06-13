import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB9WCOHHYNfX9t9gNmf1fnA7is2RYrPXpQ",
  authDomain: "shocase-portfolio.firebaseapp.com",
  projectId: "shocase-portfolio",
  storageBucket: "shocase-portfolio.appspot.com",
  messagingSenderId: "520216889411",
  appId: "1:520216889411:web:ef199543f753bbb29d2cf6",
  measurementId: "G-HSP017JMB9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();



export { db, storage };