import { createContext, useState, useContext } from "react";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [dbDatas, setDbdatas] = useState([]);
  const [uid, setUid] = useState("");

  return (
    <GlobalContext.Provider value={{ dbDatas, setDbdatas, uid, setUid }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);
