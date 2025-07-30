import "./login.css";
import { getApps, getApp, initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "firebase/auth";
import {
  hideLoginError,
  showLoginState,
  showLoginForm,
  showApp,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout,
} from "./ui";
import { Link } from "react-router-dom";
import { auth } from ".";
import { RegisterForm } from "./RegisterForm";
import { loginUser } from "./Authentication/emailAuth";
import { useNavigate } from "react-router-dom";
import images from "../assets/images";
import { ImageBackground } from "react-native";

// Login using email/password

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value;
  const password = txtPassword.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// // Monitor auth state
// const monitorAuthState = async () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log(user);
//       showApp();
//       showLoginState(user);

//       hideLoginError();
//       hideLinkError();
//     } else {
//       showLoginForm();
//       lblAuthState.innerHTML = `You're not logged in.`;
//     }
//   });
// };
// monitorAuthState();

// Log out
const logout = async () => {
  await signOut(auth);
};

const Login = () => {
  let navigate = useNavigate();

  const loginEmailPassword = () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;
    console.log("GOT HEREEEE", auth, loginEmail, loginPassword);
    loginUser(loginEmail, loginPassword, navigate);
  };

  return (
    <ImageBackground
      source={images.myImage1}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <div className="body">
        <div class="header">
          <h1>Volleyball Assistant Login</h1>
        </div>
        <div>
          <form>
            <div class="group">
              <input id="txtEmail" type="email" />
              <label>Email</label>
            </div>
            <div class="group">
              <input id="txtPassword" type="password" />
              <label>Password</label>
            </div>
            <div id="divLoginError" class="group">
              <div id="lblLoginErrorMessage" class="errorlabel">
                Error message
              </div>
            </div>
            <button
              onClick={loginEmailPassword}
              type="button"
              class="button buttonBlue"
            >
              Log in
            </button>
            <Link to="/RegisterForm">
              <div variant="outlined" className="teamsList">
                "Sign Up"
              </div>
            </Link>
          </form>
        </div>
      </div>
    </ImageBackground>
  );
};
export default Login;
