"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductInquiry from './ProductInquiry';

export default function InquiryCart() {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showInquiry, setShowInquiry] = useState(false);
    const notificationTimeoutRef = useRef(null);
    const lastNotificationRef = useRef({ product: null, time: 0 });
    const processingRef = useRef(false);

    useEffect(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('productInquiryCart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }
    }, []);

    useEffect(() => {
        // Save cart to localStorage
        if (cart.length > 0) {
            localStorage.setItem('productInquiryCart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('productInquiryCart');
        }
    }, [cart]);

    const addToCart = useCallback((product) => {
        // Prevent concurrent calls
        if (processingRef.current) {
            return;
        }

        processingRef.current = true;
        const now = Date.now();
        const timeSinceLastNotification = now - lastNotificationRef.current.time;
        const isSameProduct = lastNotificationRef.current.product === product.name;

        // Prevent duplicate notifications within 2000ms for the same product
        if (isSameProduct && timeSinceLastNotification < 2000) {
            processingRef.current = false;
            return;
        }

        // Clear any pending notification timeout to prevent duplicates
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
            notificationTimeoutRef.current = null;
        }

        setCart(prev => {
            const exists = prev.find(p => p.name === product.name);
            if (exists) {
                // Show notification that product is already in cart
                notificationTimeoutRef.current = setTimeout(() => {
                    if (window.showNotification) {
                        window.showNotification(`${product.name} is already in your inquiry list`, 'info');
                        lastNotificationRef.current = { product: product.name, time: Date.now() };
                    }
                    notificationTimeoutRef.current = null;
                    processingRef.current = false;
                }, 100);
                return prev;
            }
            // Show success notification only once
            notificationTimeoutRef.current = setTimeout(() => {
                if (window.showNotification) {
                    window.showNotification(`${product.name} added to inquiry list`, 'success');
                    lastNotificationRef.current = { product: product.name, time: Date.now() };
                }
                notificationTimeoutRef.current = null;
                processingRef.current = false;
            }, 100);
            return [...prev, product];
        });
    }, []);

    const removeFromCart = (productName) => {
        setCart(prev => prev.filter(p => p.name !== productName));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Expose addToCart globally so product cards can use it
    useEffect(() => {
        window.addProductToInquiry = addToCart;
        return () => {
            delete window.addProductToInquiry;
        };
    }, [addToCart]);

    if (cart.length === 0 && !isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 9999
                }}
            >
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: '#1a1a1a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '64px',
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        fontSize: '1.5rem',
                        position: 'relative'
                    }}
                >
                    🛒
                    {cart.length > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                background: '#ef4444',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}
                        >
                            {cart.length}
                        </motion.span>
                    )}
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '2rem',
                            zIndex: 9998,
                            background: '#ffffff',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                            width: '380px',
                            maxHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>
                                Product Inquiry ({cart.length})
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#64748b',
                                    padding: '0.25rem',
                                    borderRadius: '4px'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem'
                        }}>
                            {cart.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    color: '#64748b'
                                }}>
                                    <p>No products selected</p>
                                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                        Click "Add to Inquiry" on products to get started
                                    </p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {cart.map((product, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            style={{
                                                background: '#f8fafc',
                                                borderRadius: '8px',
                                                padding: '1rem',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                border: '1px solid #e2e8f0'
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <p style={{
                                                    fontWeight: 500,
                                                    color: '#0f172a',
                                                    margin: 0,
                                                    fontSize: '0.9375rem'
                                                }}>
                                                    {product.name}
                                                </p>
                                                <p style={{
                                                    fontSize: '0.8125rem',
                                                    color: '#64748b',
                                                    margin: '0.25rem 0 0 0'
                                                }}>
                                                    {product.desc}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(product.name)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    padding: '0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '1.25rem',
                                                    marginLeft: '0.5rem'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div style={{
                                padding: '1.5rem',
                                borderTop: '1px solid #e2e8f0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                <motion.button
                                    onClick={() => {
                                        setShowInquiry(true);
                                        setIsOpen(false);
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        background: '#1a1a1a',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '0.9375rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Send Inquiry
                                </motion.button>
                                <button
                                    onClick={clearCart}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'transparent',
                                        color: '#64748b',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Clear All
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <ProductInquiry
                isOpen={showInquiry}
                onClose={() => {
                    setShowInquiry(false);
                    clearCart();
                }}
                selectedProducts={cart}
            />
        </>
    );
}

