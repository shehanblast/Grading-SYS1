import logo from './logo.svg';
import './App.css';
import Routes from "./routes/routes";
import {LoadUser} from "./Actions/Authentication";
import {setToken} from "./setToken";
import store from "./Store";
import React, {useEffect} from "react";

if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}


function App() {
    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);
  return (
    <div className="App">
        <Routes/>
    </div>
  );
}

export default App;
