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
import Films from './Components/Films/Films.jsx';
import Actor from './Actor.jsx';
import Movies from './Components/Movies/Movies.jsx';

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
        path: '/profile/films',
        element: <Films/>
      },
      {
        path: '/result/:id',
        element: <Result/>
      },
      {
        path: '/actor/:id',
        element: <Actor/>
      },
      {
        path: '/actor/:id/movies',
        element: <Movies/>
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
