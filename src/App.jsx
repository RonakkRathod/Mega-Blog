import { useState, useEffect,  } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from "./features/authSlice"
import {Header, Footer} from "./components/index"
import { useNavigate,Outlet } from 'react-router-dom'


function App() {
  const[loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
 useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
          // Redirect to the login page when no user data is returned
          navigate("/login"); 
        }
    })
    .catch( (err) => {
       console.log("Unexpected error during auth check:", err);
       dispatch(logout());
       navigate("/login"); // redirect even on unexpected failure
    })
    .finally(() => setLoading(false))
},[dispatch, navigate]) 

 return !loading ? (
  <div className="bg-gray-500 text-3xl min-h-screen flex flex-wrap content-between ">
    <div className='w-full block'> 
      <Header /> 
      <main>
         <Outlet /> 
      </main>
      <Footer />
    </div>
  </div>
 ) : null
}

export default App