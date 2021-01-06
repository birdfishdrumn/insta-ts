import React,{useState,useEffect} from "react"
import './App.css';
import Router from "./Router"
import "./assets/reset.css"
import "./assets/style.css"
import { Header } from "./components/Header"
import {Loading} from "./components/UI"
const App = () => {
  return (
    <Loading>
         <Header/>
        <main className="c-main">
                <Router />
      </main>
      </Loading>
  )

}

export default App;
