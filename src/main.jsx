import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login, LogoutBtn, Profile} from './components/index.js'

import Home from './pages/Home.jsx'
import EditPost from './pages/EditPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import SignUp2 from './pages/SignUp2.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path:"/login",
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        ),
      },
      {
        path:"/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp2/>
          </AuthLayout>
        ),
      },
      {
        path:"/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts/>
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost/>
          </AuthLayout>
        ),
      },
      {
        path: '/profile',
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile/>
          </AuthLayout>
        )
      },
      {
        path: '/logout',
        element: (
          <AuthLayout authentication>
            {" "}
            <LogoutBtn/>
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element:(
          <AuthLayout authentication>
            {" "}
            <Post/>
          </AuthLayout>
        )
      },

    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
