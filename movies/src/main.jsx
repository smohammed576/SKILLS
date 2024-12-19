import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/style.css';
import App from './App.jsx';
import { DataProvider } from './hooks/context/DataContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';
import Search from './Search.jsx';
import Profile from './Profile.jsx';
import Result from './Result.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/result/:id',
        element: <Result/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={routes}/>
    </DataProvider>
  </StrictMode>,
)
