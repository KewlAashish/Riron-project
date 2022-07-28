import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhYHqFYcQFybc0NvQ8LIG3KY9aUWpU0mA",
  authDomain: "riron-d13de.firebaseapp.com",
  projectId: "riron-d13de",
  storageBucket: "riron-d13de.appspot.com",
  messagingSenderId: "989440870776",
  appId: "1:989440870776:web:748d7b2dbf4f195dc6208d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
