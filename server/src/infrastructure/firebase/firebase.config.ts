// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCpe-swfq_-xNyiK-cbPO7HFep9_kLEAbQ",
  authDomain: "fordev-storage.firebaseapp.com",
  projectId: "fordev-storage",
  storageBucket: "fordev-storage.appspot.com",
  messagingSenderId: "469428598782",
  appId: "1:469428598782:web:c18f06a8c6d707351132af",
  measurementId: "G-4QG2B1XM20"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};
