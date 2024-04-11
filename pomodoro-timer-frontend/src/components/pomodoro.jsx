import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, pauseTimer, resetTimer, selectTask } from '../redux/timeReducer';
import playBellSound from '../utlis/bellSound';
import { addTask } from '../redux/taskReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pomodoro = () => {
  const [userTask, setUserTask] = useState({
    taskTitle: '',
    estimatedCycle: ''
  })
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const task = useSelector(state => state.task);
  const completedWorkSessions = useSelector(state => state.completedWorkSessions);
  const [workSessions, setWorkSessions] = useState(completedWorkSessions);
  const [totalPomodoross, setTotalPomodoros] = useState(0);

  const totalPomodoros = totalPomodoross;
  const completedPomodoros = tasks.reduce((total, task) => total + task.completedCycles, 0);

  useEffect(() => {
    if (isRunning) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            dispatch(resetTimer());
            handleSkip();
            playBellSound();

            if (task === 'Work') {
              setWorkSessions(prevSessions => prevSessions + 1);
            }

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setTimer(timerInterval);
    } else {
      clearInterval(timer);
    }

    document.title = `${task} - ${formatTime(timeLeft)}`;
    return () => clearInterval(timer);
  }, [isRunning, dispatch, task]);

  useEffect(() => {
    if (workSessions > 0 && workSessions % 4 === 0) {
      handleTaskSelect('Long Break');
    }
  }, [workSessions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserTask(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false);
      dispatch(pauseTimer());
    } else {
      setIsRunning(true);
      dispatch(startTimer());
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timer);
    setTimeLeft(task === 'Work' ? 25 * 60 : task === 'Short Break' ? 5 * 60 : 15 * 60);
    dispatch(resetTimer());
  };

  const handleTaskSelect = (selectedTask) => {
    if (!isRunning) {
      setTimeLeft(selectedTask === 'Work' ? 25 * 60 : selectedTask === 'Short Break' ? 5 * 60 : selectedTask === 'Long Break' ? 20 * 60 : 25 * 60);
      dispatch(selectTask(selectedTask));
    }
  };
  const handleSkip = () => {
    if (!isRunning) {
      if (task === 'Work') {
        handleTaskSelect('Short Break');
      } else if (task === 'Short Break') {
        handleTaskSelect('Work');
      } else if (task === 'Long Break') {
        handleTaskSelect('Work');
      }
    }
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const addTask = () => {
    const newTask = {
      name: userTask.taskTitle,
      estimatedCycles: userTask.estimatedCycle,
      completedCycles: 0
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setTotalPomodoros(prevTotal => prevTotal + 1);

  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completedCycles++;
    setTasks(updatedTasks);
  };

  const progressBarStyles = {
    width: `${((25 * 60 - timeLeft) / (25 * 60)) * 100}%`,
    height: '5px',
    backgroundColor: task === 'Work' ? '#4caf50' : task === 'Short Break' ? '#f44336' : '#2196f3',
    transition: 'width 1s linear'
  };

  const finishTime = () => {
    const currentTime = new Date();
    const totalTimeSpent = completedPomodoros * 25 * 60;
    const finishTimeInMilliseconds = currentTime.getTime() + totalTimeSpent * 1000;
    const finishTimeDate = new Date(finishTimeInMilliseconds);
    return finishTimeDate.toLocaleTimeString();
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Pomodoro Timer</h1>
      <div className="row justify-content-center mt-3">
        <div className="col-auto">
          <button className="btn btn-success mr-4 p-2" style={{ marginRight: '4px' }} onClick={() => handleTaskSelect('Work')} disabled={task === 'Work' || isRunning}>Pomodoro</button>
          <button className="btn btn-danger mr-2 p-2" style={{ marginRight: '4px' }} onClick={() => handleTaskSelect('Short Break')} disabled={task === 'Short Break' || isRunning}>Short Break</button>
          <button className="btn btn-primary p-2" style={{ marginRight: '4px' }} onClick={() => handleTaskSelect('Long Break')} disabled={task === 'Long Break' || isRunning}>Long Break</button>
        </div>
      </div>
      <div className="progress mt-3">
        <div className="progress-bar" role="progressbar" style={progressBarStyles}></div>
      </div>
      <h3 className="timer mt-3">{formatTime(timeLeft)}</h3>
      <p className="mt-3">Completed Pomodoros: {completedPomodoros}/{totalPomodoros}</p>
      <p>Finish At: {finishTime()}</p>
      <div className="row justify-content-center mt-3">
        <div className="col-auto">
          <button className="btn btn-primary mr-2" style={{ marginRight: '4px' }} onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
          <button className="btn btn-secondary mr-2" style={{ marginRight: '4px' }} onClick={handleReset}>Reset</button>
          <button className="btn btn-secondary" style={{ marginRight: '4px' }} onClick={handleSkip}>Skip</button>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-center">Task Management</h2>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <input type="text" name='taskTitle' className="form-control mb-2" placeholder="Task Name" id="taskName" value={userTask.taskTitle} onChange={handleChange} />
            <input type="number" name='estimatedCycle' className="form-control mb-2" placeholder="Estimated Cycles" id="estimatedCycles" value={userTask.estimatedCycle} onChange={handleChange} />
            <button className="btn btn-primary btn-block" onClick={addTask}>Add Task</button>
          </div>
        </div>
        <ul className="list-group mt-3">
          {tasks.map((task, index) => (
           <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
           <div className="col-md-9"> 
             <div className="p-3 mb-3">
               <div className="mb-2">Task: {task.name}</div>
               <div className="mb-2">Estimated Cycles: {task.estimatedCycles}</div>
               <div>Completed Cycles: {task.completedCycles}</div>
             </div>
           </div>
           <div className="col-md-2">
             <button className="btn btn-danger btn-sm" onClick={() => completeTask(index)}>Complete Task</button>
           </div>
         </li>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pomodoro;