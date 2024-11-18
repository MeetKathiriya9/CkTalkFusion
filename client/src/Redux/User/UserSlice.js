import { createSlice } from "@reduxjs/toolkit";

const Statemgmt = createSlice({
    name: "user",
    initialState: {
        CurrentUser: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        StoreCurrentUser(state,action){
            state.CurrentUser = action.payload;
        }
    }
})


export const StatemgmtAction = Statemgmt.actions;
export default Statemgmt;