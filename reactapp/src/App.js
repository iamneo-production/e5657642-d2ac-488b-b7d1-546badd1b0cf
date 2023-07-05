import React from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/LoginRegister.css'

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={< LoginPage/>} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/Home'} element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;