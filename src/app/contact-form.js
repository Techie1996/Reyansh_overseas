"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // Client-side validation
        if (!form.firstName || form.firstName.trim().length < 2) {
            setStatus('Please enter a valid first name (at least 2 characters)');
            setLoading(false);
            return;
        }

        if (!form.lastName || form.lastName.trim().length < 2) {
            setStatus('Please enter a valid last name (at least 2 characters)');
            setLoading(false);
            return;
        }

        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setStatus('Please enter a valid email address');
            setLoading(false);
            return;
        }

        if (!form.message || form.message.trim().length < 10) {
            setStatus('Please provide a message (at least 10 characters)');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('https://reyansh-overseas.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    email: form.email.trim().toLowerCase(),
                    message: form.message.trim()
                }),
            });

            const data = await res.json();
            if (data.success) {
                setStatus('Message sent successfully! We will get back to you soon.');
                setForm({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                setStatus(data.error || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error('Contact form error:', err);
            setStatus('Network error. Please check your connection and try again.');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '100%', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%' }}
            >
                <motion.input
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02, borderColor: '#4285f4' }}
                    style={{ flex: '1 1 calc(50% - 8px)', minWidth: '150px', padding: 12, borderRadius: 8, border: '2px solid #ddd', fontSize: 16, transition: 'all 0.3s ease', boxSizing: 'border-box', width: '100%' }}
                />
                <motion.input
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02, borderColor: '#4285f4' }}
                    style={{ flex: '1 1 calc(50% - 8px)', minWidth: '150px', padding: 12, borderRadius: 8, border: '2px solid #ddd', fontSize: 16, transition: 'all 0.3s ease', boxSizing: 'border-box', width: '100%' }}
                />
            </motion.div>
            <motion.input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02, borderColor: '#4285f4' }}
                style={{ padding: 12, borderRadius: 8, border: '2px solid #ddd', fontSize: 16, transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box' }}
            />
            <motion.textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.01, borderColor: '#4285f4' }}
                style={{ padding: 12, borderRadius: 8, border: '2px solid #ddd', fontSize: 16, minHeight: 100, resize: 'vertical', transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box' }}
            />
            <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: 14,
                    fontWeight: 'bold',
                    background: loading ? '#666' : '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 16,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                {loading ? 'Sending...' : 'Send'}
            </motion.button>
            {status && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginTop: 12,
                        color: status.includes('success') ? 'green' : 'red',
                        padding: 12,
                        borderRadius: 8,
                        background: status.includes('success') ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                        textAlign: 'center',
                        fontWeight: 500
                    }}
                >
                    {status}
                </motion.div>
            )}
        </form>
    );
} 