import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Profile from './Routes/Profile/Profile';
import Search from './Routes/Search/Search';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Github user search</h2>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/profile" element={<Profile user={'hola'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
