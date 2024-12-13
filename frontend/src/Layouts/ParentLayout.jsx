import React from 'react';
import NavBar from '../Components/NavBar/NavBar';
import Home from '../Pages/Common Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';

// prosthetoume navbar parent otan to ftiaksoume
// routes analoga me to an eisai parent
const ParentLayout = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <Home />
          }
        />
      </Routes>
    </>
  );
};

export default ParentLayout;