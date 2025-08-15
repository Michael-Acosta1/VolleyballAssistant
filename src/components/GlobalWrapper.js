import React, { useState } from "react";
import { GlobalProvider } from "./GlobalContext";

function GlobalWrapper({ children }) {
  //add <div className="global-wrapper-styles"> to add dark theme, ect.
  return <GlobalProvider>{children}</GlobalProvider>;
}

export default GlobalWrapper;
