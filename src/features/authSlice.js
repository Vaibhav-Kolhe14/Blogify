import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,        //still user not authenticated
    userData: null       //initially  no user data 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
           // console.log('action: ', action);
            // state.userData = action.payload.userData

            const {userData} = action.payload;
            // console.log('userData: (in authSlice.jsx)', userData);
            state.userData = userData;
            // console.log('state: ', state);
        },
        logout: (state) => {
            state.status = false
            state.userData = null
        }

    }
})



export const {login, logout} = authSlice.actions

export default authSlice.reducer