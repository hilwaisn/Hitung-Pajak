import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Admin from './components/Admin';
import Employee from './components/Employee';
import HomeAdmin from './components/HomeAdmin';
import HomeEmployee from './components/HomeEmployee';
import Home from './pages/Home';
import About from './pages/About';
import { RouterProvider } from "react-router-dom";
import { LogOut } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/employee",
        element: <Employee />
      },
      {
        path: "/home-admin",
        element: <HomeAdmin />
      },
      {
        path: "/home-employee",
        element: <HomeEmployee />
      },
      {
      path: "/home",
      element: <LogOut />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
