import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl">Support System</Link>
                <div>
                    {user ? (
                        <>
                            {user.role === "end-user" &&<span><Link to="/tickets/new" className="mr-4">Create Ticket</Link></span>}
                            <span><Link to="/tickets" className="mr-4">View Tickets</Link></span>
                            <span className="mr-4">Hello, {user.username}</span>
                            <button onClick={logout} className="px-4 py-2 bg-red-500 rounded-md">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
