import { use, useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileNavBar from './components/MobileNavBar'
import Box from './components/box'
import Profile from './pages/Profile'
import Ambu from './pages/Ambu'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Care from './pages/Care'
import Mainhospital from './pages/Mainhospital'
import Medicine from './pages/Medicine'


function App() {
  // Initialize isAuthenticated from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    return storedAuthState === 'true'; // Convert string to boolean
  });

  const [user , setUser] = useState(()=>{
    const store = localStorage.getItem('user');
    return store;
  });
  // Save authentication state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    console.log("Saving isAuthenticated to localStorage:", isAuthenticated);
  }, [isAuthenticated]);
  const router = createBrowserRouter([
    {
    path: '/', 
    element: <><Navbar/><Box/><MobileNavBar/><Footer/></>,
    errorElement: <h1>404</h1>
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Navbar />
        <MobileNavBar />
        <Profile />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path : '/ambulance',
    element : <><Ambu/></>
  },
  {
    path:'/carecompass',
    element : <><Care/></>
  },
  {
    path : '/signup',
    element : <><Signup/><Footer/></>,
  },
  {
    path : '/login',
    element : <><Navbar/><Login
    isAuthenticated={isAuthenticated}
    setIsAuthenticated={setIsAuthenticated}
  /><Footer/></>
  }
  ,
  {
    path : '/hospital',
    element : <><Mainhospital/></>,

  },
  {
    path : '/medicines',
    element : <><Navbar/><Medicine/></>
  }
  ]);
  // const rout = createBrowserRouter([{
  //   path: '/',
  //   element: <><Footer/></>,
  //   errorElement: <h1>404</h1>
  // }])

  return (
    <div className='relative min-h-[100vh]' >
    <Manager/>
    <RouterProvider router={router} />
    <div className="main-foot">
      {/* <RouterProvider router={rout} /> */}
    </div>
      
    </div> 
  )
}

export default App
