import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export { auth };
