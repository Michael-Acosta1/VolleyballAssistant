import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  CollectionReference,
  getDocs,
  getFirestore,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";
import { useGlobalData } from "../GlobalContext";
// Your web app's Firebase configuration
const firebaseApp = getApps().length
  ? getApp()
  : initializeApp({
      apiKey: "AIzaSyC8B7mYmxzqX8RrnxCurMCpGRMBxMIfK9s",
      authDomain: "volleyballassistant-ddb2d.firebaseapp.com",
      projectId: "volleyballassistant-ddb2d",
      storageBucket: "volleyballassistant-ddb2d.firebasestorage.app",
      messagingSenderId: "886069125966",
      appId: "1:886069125966:web:6346f7fda8d688c402341f",
    });
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const dbData = [];
const getCollectionData = async (uid, dbDatas, setDbdatas) => {
  let q = collection(db, `users`);
  const userData = await getDocs(q);
  userData.forEach((doc) => {
    console.log("user", uid, "db: ", doc.data(), doc.id);
    dbData.push(doc.data());
  });
  setDbdatas(dbData[0]);

  console.log("dbdatas set: ", dbDatas);
};

export { auth, db, getCollectionData };
