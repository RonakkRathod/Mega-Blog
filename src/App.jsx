import { useState, useEffect,  } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from "./features/authSlice"
import {Header, Footer} from "./components/index"


function App() {
  const[loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
    })
    .finally(() => setLoading(false))
  },[])

 return !loading ? (
  <div className="bg-gray-500 text-3xl min-h-screen flex flex-wrap content-between ">
    <div className='w-full block'> 
      <Header /> 
      <main>
         {/* <outlet />  */}
      </main>
      <Footer />
    </div>
  </div>
 ) : null
}

export default App