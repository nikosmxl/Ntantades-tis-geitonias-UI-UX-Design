import React from 'react';
import WelcomeNavBar from '../Components/WelcomeNavBar/WelcomeNavBar';
import Home from '../Pages/Common Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';

// prosthetoume navbar logged out otan to ftiaksoume
// routes analoga me to an eisai logged out
const LoggedOutLayout = () => {
  return (
    <>
      <WelcomeNavBar />
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

export default LoggedOutLayout;