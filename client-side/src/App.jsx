import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Home } from './Pages/Home';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
