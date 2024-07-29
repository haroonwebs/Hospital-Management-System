import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { useState } from 'react'


export const Context = createContext({isAdminAuth : false});

const AppWarpper = () =>{
 const[isAdminAuth, setisAdminAuth] = useState(false);
 const[user, setUser] = useState({});

 return (
   <Context.Provider value={{ isAdminAuth, setisAdminAuth, user, setUser }}>
     <App />
   </Context.Provider>
 );

}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWarpper />
  </React.StrictMode>
);
