import { registerRootComponent } from "expo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./src/App";
import { render } from "react-native-web";
import Home from "./src/Home";
import Login from "./src/components/login/Login";
import TeamRoster from "./src/TeamRoster";
import RegisterForm from "./src/components/login/RegisterForm";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/TeamRoster" element={<TeamRoster />} />
      <Route path="/RegisterForm" element={<RegisterForm />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

//registerRootComponent(App);
