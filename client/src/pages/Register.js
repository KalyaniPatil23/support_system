import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
    return (
        <div>
            <h1 className="text-2xl text-center mt-10">Register</h1>
            <AuthForm isLogin={false} />
        </div>
    );
};

export default Register;
