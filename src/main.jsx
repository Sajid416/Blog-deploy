import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import router from './pages/Routes';
import { DataContext, DataProvider } from './context/DataContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
    <RouterProvider router={router}/>   
    </DataProvider>    
  </StrictMode>,
)
