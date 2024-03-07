import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logoutModale : false,
    uploadModale : false
}

const modalStatus = createSlice(
    {
      name : 'modaleStatus',
      initialState,
      reducers:{
        logoutModaleStatus(state,action){
            state.logoutModale = action.payload.status;
        },
        uploadModaleStatus(state,action){
          state.uploadModale = action.payload.status;
      }
      }

    }
)

export const {logoutModaleStatus} = modalStatus.actions;
export const {uploadModaleStatus} = modalStatus.actions;
export default modalStatus.reducer;