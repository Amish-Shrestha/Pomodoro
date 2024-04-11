import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLogin, loginHandler } from '../redux/authreducer';
import loginImage from '../assest/images/login.webp'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await handleLogin(username, password);
      if (token) {
        navigate("/pomodoro");
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  }

  const navigate = useNavigate()

  const handleLogin = async (username, password) => {
    try {
      dispatch(loginHandler({
        username: username, password: password, callBack: () => {
          navigate("/pomodoro");
        }
      }));
    } catch (error) {
      console.error('Login error: ', error);
      throw error;

    }
  };

  return (
    <div className="container-lg d-flex justify-content-center align-items-center vh-100">
    <div className="p-4 shadow rounded">
    <div className="row">
      <div className="col-md-6">
        <img src={loginImage} alt="Login" className="img-fluid" />
      </div>
      <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <form className='p-2' onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group mb-3">
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberPassword" checked={rememberPassword} onChange={(e) => setRememberPassword(e.target.checked)} />
              <label className="form-check-label" htmlFor="rememberPassword">Remember Password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
        
      </div>
    </div>
  </div>
    
  );
}

export default Login;
