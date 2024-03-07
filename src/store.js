import {configureStore} from '@reduxjs/toolkit';
import  registerState  from './features/registerSlice';
import  changeLoggedStatus  from './features/loggedSlice';
import  logoutModaleStatus  from './features/modalSlice';
import uploadModaleStatus  from './features/modalSlice';

const store = configureStore({
reducer:{
    'register' : registerState,
    'loggedStatus' : changeLoggedStatus,
    'modaleStatus' : logoutModaleStatus,
    'modaleStatus' : uploadModaleStatus,
}
})

export default store