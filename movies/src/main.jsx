import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/style.css';
import App from './App.jsx';
import { DataProvider } from './hooks/context/DataContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Films from './Components/Films/Films.jsx';
import Movies from './Components/Movies/Movies.jsx';
import Home from './Pages/Home/Home.jsx';
import Search from './Pages/Search/Search.jsx';
import Actor from './Pages/Actor/Actor.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import Result from './Pages/Result/Result.jsx';
import { Genre } from './Components/FilmLists/FilmLists.jsx';

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
      },
      {
        path: '/films/:list/:id',
        element: <Genre/>
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
