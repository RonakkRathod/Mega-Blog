import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state) =>  state.auth.status)
  const navigate = useNavigate();

  // navigation items array
  const navItems = [
    {
      name: 'Home',
      slug: "/",     // slug = url where it will navigate
      active:true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: "/Signup",
      active: !authStatus,
    },
    {
      name: 'all posts',
      slug: "/posts",
      active: authStatus
    },
    {
      name: 'Add post ',
      slug: "/add-post",
      active: authStatus
    }
  ]

  return (
   <header className='py-3 shadow bg-gray-500'>
    <Container>
       <nav className=' flex'>
         <div className='mr-4'>
           <Link to='/'>
             <Logo width="70px" /> // clicking on logo takes to home page

           </Link>
         </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) => ( // loop through navItems array  
               item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug) }
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-full'
                  >{item.name}</button>
                </li>
               ) : null
            ))}
            {authStatus && ( // if authStatus is true show logout button
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
       </nav>
    </Container>
   </header>
  )
}

export default Header