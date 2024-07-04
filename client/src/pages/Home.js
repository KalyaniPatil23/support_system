import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl mb-4">Welcome to the Support System</h1>
            {/* <div className="flex space-x-4">
                <Link to="/tickets" className="px-4 py-2 bg-blue-500 text-white rounded-md">View Tickets</Link>
                <Link to="/tickets/new" className="px-4 py-2 bg-green-500 text-white rounded-md">Create Ticket</Link>
            </div> */}
        </div>
    );
};

export default Home;
