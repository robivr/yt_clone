import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
import Watch from './components/Watch/Watch';

import './App.css';
import Search from './components/Search/Search';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [watchSidebarOpen, setWatchSidebarOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Routes>
          <Route path="/" element={<Home sidebarOpen={sidebarOpen} />} />
          <Route path="/watch" element={<Watch sidebarOpen={sidebarOpen} />}>
            <Route
              path=":videoId"
              element={<Watch sidebarOpen={sidebarOpen} />}
            />
          </Route>
          <Route path="/search/:searchParams" element={<Search />} />
          <Route path="*" element={<Home sidebarOpen={sidebarOpen} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
