import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer  from './Slices/wishList'
export const store =configureStore({
    reducer:{
        wishlist:wishlistReducer ,

    }
})

export default store


