import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus
    }
  ]

  return (
   <>
    <header className='py-3 shadow bg-[#3a4664] w-full fixed left-0 top-0 z-50'>
      <Container>
        <nav className='flex flex-col sm:flex-row'>
          <div className='px-6 py-2 text-center hidden sm:block'>
            <Link to='/'>
              <Logo width='70px'></Logo>
            </Link>
          </div>
          <ul className='flex flex-col sm:flex-row sm:ml-auto items-center'>
              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)} className='px-6 py-2 hover:underline inline-block duration-200 hover:bg-blue-600 hover:bg-opacity-10 hover:font-bold 
                    rounded-2xl'>{item.name}</button>
                  </li>
                ) : null 
            )}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
   </>
  )
}

export default Header
