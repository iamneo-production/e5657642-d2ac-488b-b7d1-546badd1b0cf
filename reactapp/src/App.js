import React from "react";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Login/RegisterPage";
import Home from './components/Home/Home';
import Budget from './components/Budget/Budget';
import Debts from './components/Debts/Debts';
import Goals from './components/Goals/Goals';
import Reports from './components/Reports/Reports';
import Transaction from './components/Transaction/Transaction';
import Accounts from "./components/Accounts/Accounts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/LoginRegister.css';

function App (){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/dashboard'} element={<Home />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/debts" element={<Debts />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;