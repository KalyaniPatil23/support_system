import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AuthForm = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, register } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            if (username !== '' && password !== '')
                login(username, password);
            else
                alert("Please fill all fields")
        } else {
            if (username !== '' && password !== '')
                register(username, password, 'end-user');
            else
                alert("Please fill all fields")
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
            <div className="mb-4">
                <label className="block mb-1">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            {/* {!isLogin && (
                <div className="mb-4">
                    <label className="block mb-1">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        <option value="end-user">End User</option>
                        <option value="tech-support">Tech Support</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            )} */}
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
                {isLogin ? 'Login' : 'Register'}
            </button>
        </form>
    );
};

export default AuthForm;
