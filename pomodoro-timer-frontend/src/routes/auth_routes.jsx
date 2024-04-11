import Pomodoro from '../components/pomodoro';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoutes = () => {
    const auth = useSelector(state => state.auth);

    return (!auth.isAuthenticated ? <Navigate to="/" /> :
        <div>
             <Outlet /> 
        </div>
    )
}

export default AuthRoutes