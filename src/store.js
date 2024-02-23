import {configureStore} from '@reduxjs/toolkit';
import  registerState  from './features/registerSlice';

const store = configureStore({
reducer:{
    'register' : registerState
}
})

export default store