import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicketForm = ({ onTicketCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            await axios.post('http://localhost:5000/api/tickets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("file uploaded")
            setTitle('');
            setDescription('');
            setAttachment(null);
            navigate('/tickets');
        } catch (err) {
            console.error('Failed to create ticket:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
            <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
                Create Ticket
            </button>
        </form>
    );
};

export default TicketForm;
