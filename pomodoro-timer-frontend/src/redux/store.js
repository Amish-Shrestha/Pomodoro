import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authreducer';
import taskReducer from './taskReducer';
import timerReducer from './timeReducer';


const store = configureStore({
    reducer: {
        auth: authReducer.reducer,
        task: taskReducer.reducer,
        timer: timerReducer.reducer,
    }
})

export default store;