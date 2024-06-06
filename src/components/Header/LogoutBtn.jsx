import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutHandler = () => {
        authService.logout().then(() => {
            console.log('Logout Successfully !');
            dispatch(logout())
            navigate('/login')
        })
    }
  return (
   <>
    <button className='px-6 py-2 hover:underline inline-block duration-200 hover:bg-blue-600 hover:bg-opacity-10 hover:font-bold  rounded-2xl' onClick={logoutHandler}>Logout</button>
   </>
  )
}

export default LogoutBtn
