import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set } from "firebase/database";
import { useLocation } from "react-router-dom";
import { auth } from ".";
import { registerUser } from "./Authentication/emailAuth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  let navigate = useNavigate();
  const handleSubmit = () => {
    const email = document.getElementById("txtEmail");
    const pass = document.getElementById("txtPassword");
    const name = document.getElementById("txtName");

    console.log("handleSubmit", email.value, pass.value, name.value, auth);
    registerUser(name.value, email.value, pass.value, navigate);
  };
  return (
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
          <div class="group">
            <input id="txtName" type="name" />
            <label>Name</label>
          </div>
          <div id="divLoginError" class="group">
            <div id="lblLoginErrorMessage" class="errorlabel">
              Error message
            </div>
          </div>
          <button
            type="button"
            class="button buttonBlue"
            onClick={handleSubmit}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
