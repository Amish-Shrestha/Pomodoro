import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth_routes";

import Pomodoro from '../components/pomodoro';
import Login from '../components/login';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/" element={<AuthRoutes />}>
                    <Route path="/pomodoro" element={<Pomodoro />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes