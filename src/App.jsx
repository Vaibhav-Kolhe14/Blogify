import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { login, logout } from './features/authSlice'


function App() {
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()

  const userAuth = useSelector((state) => state.auth)

  useEffect(() => {
    setLoading(true)
    if(userAuth.status === true){
      authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({ userData }))
          setUserName(userAuth.userData)
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
    } else {
      dispatch(logout())
      setLoading(false)
      setUserName('')
    }
  }, [])

  console.log('username : ', userName);

  return !loading ? (
    <div className='flex flex-col min-h-screen'>
      {/* <div className='w-full block '> */}
        <Header />
        <main className='flex-grow mt-16 bg-gray-400'>
          <h2 className='text-2xl font-bold text-center w-[200px] sm:w-full mx-auto'>{userAuth.status === true ? ('Welcome, '+ userAuth.userData.name) : ''}</h2>
         <Outlet />
        </main>
        <Footer />
      {/* </div> */}
    </div>
  ) : null
}

export default App