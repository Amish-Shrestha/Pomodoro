import { createSlice } from '@reduxjs/toolkit'


const initialTimerState = {
  task: 'Work',
  isTimerRunning: false
};
const timerReducer = createSlice({
  name: "Timer",
  initialState: initialTimerState,
  reducers: {
    startTimer(state) {
      return {...state, isTimerRunning: true}
    },
    pauseTimer(state) {
      return {...state, isTimerRunning: false}
    },
    resetTimer() {
      return initialTimerState;
    },
    selectTask(state, action) {
      return {...state, task: action    .payload}
    }
  }
});
export const {startTimer, pauseTimer, resetTimer, selectTask} = timerReducer.actions;


export default timerReducer



