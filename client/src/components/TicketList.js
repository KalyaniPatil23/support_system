import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const fetchTickets = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/tickets');
            setTickets(res.data);
        } catch (err) {
            console.error('Failed to fetch tickets:', err);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-4xl mb-4 text-blue-500">Tickets</h1>
            <div className="bg-white grid grid-cols-2 gap-4 mb-4 mt-2">
                {tickets.map(ticket => (
                    <div key={ticket.id} className=" max-w-sm border-t border-gray-200 shadow overflow-hidden sm:rounded-md">
                        <Link to={`/tickets/${ticket.id}`} className="block px-4 py-4">
                            <div className="text-lg text-green-500">{ticket.title}</div>
                            <div className="text-sm text-gray-500">{ticket.description}</div>
                            <div className="text-sm text-gray-500">Status: {ticket.status}</div>
                            {localStorage.getItem('role') != 'tech-support' && <div className="text-sm text-gray-500">Assigned to : {ticket.assign ? ticket.assign : "Not assigned yet."}</div>}
                            <div className="text-sm text-gray-500">Created by : {ticket.creator}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketList;
