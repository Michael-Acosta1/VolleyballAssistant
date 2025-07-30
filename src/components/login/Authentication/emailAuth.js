import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "..";

export const registerUser = async (name, email, password, navigate) => {
  console.log("hereeee ", name, email, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const results = userCredential.user;
    console.log("results: ", results);
    await sendEmailVerification(results);
    alert("a verification email been sent");
  } catch (error) {
    console.log("error", error);
  } finally {
    navigate("/");
  }
};

export const loginUser = async (email, password, navigate) => {
  try {
    console.log("DID IT ", email, password);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const results = userCredential.user;
    if (results.emailVerified === false) {
      alert("Please Verify email");
      return;
    }
    navigate("/Home");
  } catch (error) {
    console.log("Error", error);
  }
};
