import React, {useEffect, useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import AnalyticsPage from './pages/AnalyticsPage';
import DashboardPage from './pages/DashboardPage';
import PlannerPage from './pages/PlannerPage';
import PlaidApi from './Plaid/PlaidApi';
import {
   BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import ConnectedPage from './pages/ConnectedPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <DashboardPage />
    },
    {
      path: "/analytics",
      element: <AnalyticsPage />
    },
    {
      path: "/planner",
      element: <PlannerPage />
    },
    {
      path: "/plaidLink",
      element: <PlaidApi />
    },
    {
      path: "/connected",
      element: <ConnectedPage />
    }
  ])

  return (
    <>

    <div className='App'>
      <Sidebar />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
    </>
  );
}

export default App;
