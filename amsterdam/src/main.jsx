import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./css/style.css";
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import { DataProvider } from './hooks/context/DataContext.jsx';
import Attractions from './pages/Attractions/Attractions.jsx';
import Attraction from './pages/Attractions/Attraction.jsx';
import Map from './pages/Map/Map.jsx';
import Help from './pages/Help/Help.jsx';

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
        path: '/attractions',
        element: <Attractions/>
      },
      {
        path: '/attractions/:id',
        element: <Attraction/>
      },
      {
        path: '/map',
        element: <Map/>
      },
      {
        path: '/help',
        element: <Help/>
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
