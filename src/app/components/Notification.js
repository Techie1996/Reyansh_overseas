"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notification() {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'success') => {
        // Generate unique ID using timestamp + random number to avoid collisions
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    }, []);

    useEffect(() => {
        // Set up the global function after component mounts
        window.showNotification = showNotification;

        return () => {
            delete window.showNotification;
        };
    }, [showNotification]);

    return (
        <div style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            zIndex: 10001,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
        }}>
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                        style={{
                            background: notification.type === 'success'
                                ? '#10b981'
                                : notification.type === 'error'
                                    ? '#ef4444'
                                    : '#3b82f6',
                            color: '#ffffff',
                            padding: '1rem 1.5rem',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            minWidth: '300px',
                            maxWidth: '400px',
                            fontSize: '0.9375rem',
                            fontWeight: 500
                        }}
                    >
                        {notification.message}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

