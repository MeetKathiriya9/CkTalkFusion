import { configureStore } from "@reduxjs/toolkit";

import Statemgmt from "./User/UserSlice";

const store = configureStore({
    reducer:{
        user: Statemgmt.reducer
    }
})

export default store;