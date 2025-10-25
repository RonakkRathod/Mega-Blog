import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'



function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler =() => {
        authService.logout()
        .then(() => {
            dispatch(logout()) // tell redux to delete user info from store
        })
        .catch((err) => {
            console.log("error at logoutHandler :: LogoutBtn",err);
        })
    }
  return (
   <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-300 rounded-full'
    onClick={logoutHandler}
   >Logout</button>
  )
}

export default LogoutBtn