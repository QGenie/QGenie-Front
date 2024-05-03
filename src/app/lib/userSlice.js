import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    initialState :
    {
        email : null,
        auth  : null
    } ,
    reducers : {
        setUser : ({email, auth})=>{
            email = email;
            auth = auth;
        },

    }
});

 export const {setUser} = userSlice.actions;

const store = configureStore({
    reducer : userSlice.reducer
})