import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Chatbot.css';

const Chatbot = () => {
    const { isAuthenticated, token } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', parts: [{ text: 'Hello! I am your AI assistant. How can I help you today?' }] }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');

        // Add user message to history
        const newUserMessage = { role: 'user', parts: [{ text: userMessage }] };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.reply }] }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', parts: [{ text: `Error: ${data.message}` }] }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Sorry, I am having trouble connecting to the server.' }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <span>💬</span>
                </div>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>AI Assistant</h3>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'ai'}`}>
                                {msg.parts[0].text}
                            </div>
                        ))}
                        {isLoading && <div className="message ai">...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    {!isAuthenticated ? (
                        <div className="chatbot-auth-prompt">
                            <p>Please login to chat with our AI assistant.</p>
                            <Link to="/login" className="btn btn-primary btn-sm" onClick={() => setIsOpen(false)}>
                                Login
                            </Link>
                        </div>
                    ) : (
                        <form className="chatbot-input-area" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" className="chatbot-send" disabled={isLoading || !input.trim()}>
                                ➔
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chatbot;
