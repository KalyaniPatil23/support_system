import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tickets from './pages/Tickets';
import TicketForm from './components/TicketForm';
import Ticket from './pages/Ticket';

const App = () => {

    let token = localStorage.getItem('token');
    return (
        <AuthProvider>
                <Navbar />
                <div className="container mx-auto">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={token ? <Home /> : <Login/>} />
                        <Route path="/tickets" element={<Tickets />} />
                        <Route path="/tickets/new" element={<TicketForm />} />
                        <Route path="/tickets/:id" element={<Ticket />} />
                    </Routes>
                </div>
        </AuthProvider>
    );
};

export default App;
