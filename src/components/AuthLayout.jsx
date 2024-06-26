import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        //revisit to make it easy

        // if(authStatus === true){
        //     navigate("/")
        // }else if(authStatus === false){
        //     navigate("/login")
        // }

////////////////////////////////////////////////////////////////////////////////////

        //TODO: make it more easy to understand
        
        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        //let authValue = authStatus === true ? true : false

        // Redirect to login page if authentication is required and the user is not authenticated
        // Redirect to home page if authentication is not required and the user is not authenticated
        
        /**
         * Redirects the user based on the authentication status and the required authentication.
         * 
         * @param {boolean} authentication - Indicates if authentication is required for the component.
         */

      if(authentication && authStatus !== authentication){
            navigate("/login")
      }else if(!authentication && authStatus !== authentication){
        navigate("/")
      }
      setLoader(false)
    }, [authStatus, navigate, authentication])
    

  return loader ? <h1>Loading...</h1> : <>{children}</>
}


