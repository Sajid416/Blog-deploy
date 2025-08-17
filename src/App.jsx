
import './App.css'

import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import {Outlet} from 'react-router-dom';

function App() {
  
  return (
    <>     
        <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content should grow to fill space */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
    </>
  )
}

export default App
