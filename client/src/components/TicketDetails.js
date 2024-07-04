import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const TicketDetails = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [replies, setReplies] = useState([]);
    const [supports, setSupports] = useState([]);
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isAddReply, setAddReply] = useState(false);
    const { user } = useContext(AuthContext);

    const fetchTicketDetails = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/ticket/${id}`);
            setTicket(res.data[0]);
        } catch (err) {
            console.error('Failed to fetch ticket details:', err);
        }
    };

    const fetchReplies = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/ticket/${id}/replies`);
            setReplies(res.data[0]);
        } catch (err) {
            console.error('Failed to fetch replies:', err);
        }
    };

    const fetchSupports = async () => {
        try{
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/auth/support`);
            setSupports(res.data.row)
        }catch(err){
            console.error('Failed to fetch tech support:', err);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('role') === 'admin'){
            fetchSupports();
        }
        fetchTicketDetails();
        fetchReplies();
    }, [id]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if(message != ''){
            const user_id = localStorage.getItem('user');
        const formData = new FormData()
        formData.append('ticket_id', id);
        formData.append('message', message);
        formData.append('replied_by', user_id);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/reply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('');
            setAttachment(null);
            fetchReplies();
            setAddReply(false)
        } catch (err) {
            console.error('Failed to submit reply:', err);
        }
        }else{
            alert("Message required")
        }
    };

    const updateStatus = async (e) => {
        setTicket({ ...ticket, status: e.target.value });
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/tickets/${ticket.id}/status`, { status: e.target.value })
        } catch (err) {
            console.error('Failed to update status :', err);
        }
    }

    const assignTicket = async (e) => {
        if(e.target.value != "not assigned"){
        setTicket({ ...ticket, assigned_to: parseInt(e.target.value) });
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/tickets/${ticket.id}/assign`, {assigned_to: parseInt(e.target.value)})
        } catch (err) {
            console.error('Failed to update status :', err);
        }
    }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {ticket && (
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <h1 className="text-2xl mb-4 text-green-500 font-bold">{ticket.title}</h1>
                        <h5 className="text-lg mb-4 text-blue-500">Description</h5>
                        <p>{ticket.description}</p>
                    </div>
                    <div className='mx-auto'>
                        <div className="grid grid-cols-2 gap-1 mb-4">
                            <label className="block mb-1 mt-[7%] text-lg text-blue-500"> Status :</label>
                            <select
                                value={ticket.status}
                                onChange={updateStatus}
                                className="px-4 py-2 border rounded-md"
                            >
                                <option value="open">Open</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        {localStorage.getItem('role') === 'admin' && <div className="grid grid-cols-2 gap-1 mb-4">
                            <label className="block mb-1 mt-[7%] text-lg text-blue-500"> Assigned to :</label>
                           {supports.length != 0 ? <select
                                value={ticket.assigned_to ? ticket.assigned_to : "not assigned"}
                                onChange={assignTicket}
                                className="px-4 py-2 border rounded-md"
                            >
                                <option value={'not assigned'}>Not Assigned</option>
                                {supports.map(support => (
                                    <option key={support.id} value={support.id}>{support.username}</option>
                                ))}
                            </select>
                            :
                            <span><label className="block mb-1 mt-[7%]">Tech Support not available.</label></span> 
                            }
                        </div>}
                    </div>
                </div>
            )}
            <div className="mt-10">
                <h2 className="text-xl mb-4">Replies</h2>
                <ul>
                    {replies.map(reply => (
                        <li key={reply.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                            <p>{reply.message}</p>
                            <p className="text-sm text-gray-500">By: {reply.reply_by} at {reply.created_at}</p>
                            {reply.attachment && (
                            <a href={`http://localhost:5000/${reply.attachment}`} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                View Attachment
                            </a>
                        )}
                        </li>
                    ))}
                </ul>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md mb-4" onClick={() => { setAddReply(true) }}>Add Reply</button>

                {isAddReply && <>
                    <h2 className="text-xl mb-4 mt-10">Add Reply</h2>
                    <form onSubmit={handleReplySubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="block mb-1">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                        <label className="block mb-1">Attachment</label>
                        <input
                            type="file"
                            onChange={(e) => setAttachment(e.target.files[0])}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Save
                        </button>
                    </form>
                </>}
            </div>
        </div>
    );
};

export default TicketDetails;
