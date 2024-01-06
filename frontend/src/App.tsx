import React, {useEffect, useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <>
    <div className='App'>
      <Sidebar />
      <Dashboard balance={99999} date="02/12/2024"></Dashboard>
    </div>
    </>
  );
}

export default App;
