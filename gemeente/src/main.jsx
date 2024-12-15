import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './css/style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';
import Attractions from './Attractions.jsx';
import Map from './Map.jsx';
import Help from './Help.jsx';
import { DataProvider } from './hooks/context/DataContext.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
