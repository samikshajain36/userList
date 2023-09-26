import { configureStore } from "@reduxjs/toolkit";
import postReducer from './userSlice'

const store = configureStore({
    reducer:{
        posts: postReducer,
    }
})
export default store;