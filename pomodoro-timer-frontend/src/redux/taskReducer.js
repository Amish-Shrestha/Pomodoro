import { createSlice } from '@reduxjs/toolkit'
import apiManager from '../api/api';

const initialTaskState = {
  tasks: [],
};
const taskReducer = createSlice({
  name: "Task",
  initialState: initialTaskState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    completeTask: (state, action) => {
      const updatedTasks = [...state.tasks];
      updatedTasks[action.payload].completedCycles++;
      state.tasks = updatedTasks
    }
  }
});


// export const postTask = createAsyncThunk("api/data", async ({ payload }) => {
//   const response = await apiManager.post('api/data',{});


// })



export const { addTask, completeTask } = taskReducer.actions;

export default taskReducer
