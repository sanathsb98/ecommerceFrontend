import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logged : false
}

const loggedSlice = createSlice({
    name : "loggedStatus",
    initialState,
    reducers:{
        changeLoggedStatus(state,action){
          state.logged = action.payload.logged;
        }
    }
})

export const {changeLoggedStatus} = loggedSlice.actions;
export default loggedSlice.reducer;