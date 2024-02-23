import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    register : 'registered',
}

const registerSlice = createSlice({
    name : 'register',
    initialState,
    reducers:{
        registerState(state,action){
           state.register = action.payload.status;
        }
        
    }
})

export const {registerState} = registerSlice.actions;
export default registerSlice.reducer;