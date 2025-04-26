import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicLibrary from "./components/MusicLibrary.jsx";
import AddSongForm from "./components/AddSongForm.jsx";
import { musicData } from "./data/musicData";



const MusicApp = ({ auth }) => {

 
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MusicLibrary auth={auth} songs={musicData} />}
        />
       
      </Routes>
    </Router>
  );
};

export default MusicApp;
