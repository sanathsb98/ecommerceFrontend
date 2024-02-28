import {configureStore} from '@reduxjs/toolkit';
import  registerState  from './features/registerSlice';
import  changeLoggedStatus  from './features/loggedSlice';

const store = configureStore({
reducer:{
    'register' : registerState,
    'loggedStatus' : changeLoggedStatus
}
})

export default store