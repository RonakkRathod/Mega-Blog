import { useState, useEffect, useDispatch } from 'react'
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
  <div className='min-h-screen flex flex-wrap content-between '>
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