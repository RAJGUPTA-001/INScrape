import React from 'react';
import { Route, Routes } from 'react-router';
import Homepage from "./pages/Homepage";
// import Profilepage from "./pages/Profilepage";
import BackgroundLayout from './Backgrounds/Homepage.Background'; // Import the new layout
import Dashboard from './pages/Dashboard';

function App() {
  return (

    <Routes>
      {/* <Route element={<BackgroundLayout />}>
      <Route path='/' element={<Homepage />} /> 
      </Route> */}
      <Route path='/home' element={<Homepage />} /> 
      <Route path='/show' element={<Dashboard />} />
      <Route path='*' element={<Homepage />} /> 
      
    </Routes>
    
  );
}

export default App;


