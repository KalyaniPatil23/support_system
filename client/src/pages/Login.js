import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
    return (
        <div>
            <h1 className="text-2xl text-blue-500 font-bold text-center mt-10">Login</h1>
            <AuthForm isLogin={true} />
        </div>
    );
};

export default Login;
