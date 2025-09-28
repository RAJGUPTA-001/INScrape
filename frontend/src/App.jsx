import React from 'react';
import { Route, Routes } from 'react-router';
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import BackgroundLayout from './pages/BackgroundHomepage'; // Import the new layout

function App() {
  return (

    <Routes>
      <Route element={<BackgroundLayout />}>
      <Route path='/' element={<Homepage />} /> 
      </Route>

      
      <Route path='/find' element={<Profilepage />} />
      <Route path='/show' element={<Profilepage />} />
    </Routes>
    
  );
}

export default App;
