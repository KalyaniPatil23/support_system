import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    const getUser = async(token) => {
        axios.defaults.headers.common['x-auth-token'] = token;
        const res = await axios.get('http://localhost:5000/api/auth/me');
        if(res.data)
         setUser(res.data);
        else
        localStorage.removeItem('token')

    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token);
        }
    }, []);

    const login = async (username, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setUser(res.data.user);
        navigate('/');
        window.location.reload();
    };

    const register = async (username, password, role) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setUser(res.data.user);
        navigate('/');
        window.location.reload();

    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
        navigate('/login');
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
