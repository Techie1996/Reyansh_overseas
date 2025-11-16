"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductInquiry({ isOpen, onClose, selectedProducts = [] }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        country: '',
        message: '',
        products: selectedProducts.map(p => p.name).join(', ')
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value || value.trim().length < 2) {
                    return 'Name must be at least 2 characters';
                }
                return '';
            case 'email':
                if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address';
                }
                return '';
            case 'phone':
                if (!value || value.replace(/\D/g, '').length < 10) {
                    return 'Phone number must have at least 10 digits';
                }
                return '';
            case 'country':
                if (!value || value.trim().length < 2) {
                    return 'Please enter your country';
                }
                return '';
            case 'message':
                if (!value || value.trim().length < 10) {
                    return 'Message must be at least 10 characters';
                }
                return '';
            default:
                return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        setErrors({});

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'products' && key !== 'company') {
                const error = validateField(key, formData[key]);
                if (error) {
                    newErrors[key] = error;
                }
            }
        });

        if (selectedProducts.length === 0) {
            setStatus({ type: 'error', message: 'Please select at least one product' });
            setLoading(false);
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus({ type: 'error', message: 'Please fix the errors in the form' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://reyansh-overseas.onrender.com/api/product-inquiry', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    company: formData.company.trim() || undefined,
                    phone: formData.phone.trim(),
                    country: formData.country.trim(),
                    message: formData.message.trim(),
                    products: selectedProducts.map(p => ({
                        name: p.name || p,
                        desc: p.desc || ''
                    })),
                    subject: `Product Inquiry - ${selectedProducts.length} product(s)`
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                setStatus({ 
                    type: 'success', 
                    message: data.message || 'Your inquiry has been sent successfully! We will contact you soon.' 
                });
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    country: '',
                    message: '',
                    products: ''
                });
                setTimeout(() => {
                    onClose();
                    setStatus(null);
                }, 3000);
            } else {
                const errorMessage = data.errors 
                    ? data.errors.join(', ') 
                    : data.error || 'Failed to send inquiry. Please try again.';
                setStatus({ type: 'error', message: errorMessage });
            }
        } catch (err) {
            console.error('Inquiry submission error:', err);
            setStatus({ 
                type: 'error', 
                message: 'Network error. Please check your connection and try again.' 
            });
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    backdropFilter: 'blur(4px)'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                            Product Inquiry
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#64748b',
                                padding: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (e.currentTarget) {
                                    e.currentTarget.style.background = '#f1f5f9';
                                    e.currentTarget.style.color = '#1a1a1a';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (e.currentTarget) {
                                    e.currentTarget.style.background = 'none';
                                    e.currentTarget.style.color = '#64748b';
                                }
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {selectedProducts.length > 0 && (
                        <div style={{
                            background: '#f8fafc',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            border: '1px solid #e2e8f0'
                        }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                Selected Products ({selectedProducts.length}):
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {selectedProducts.map((product, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            background: '#ffffff',
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '6px',
                                            fontSize: '0.8125rem',
                                            color: '#1a1a1a',
                                            border: '1px solid #e2e8f0'
                                        }}
                                    >
                                        {product.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        borderRadius: '8px',
                                        border: `2px solid ${errors.name ? '#ef4444' : '#cbd5e1'}`,
                                        fontSize: '0.9375rem',
                                        transition: 'all 0.2s',
                                        outline: 'none',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => {
                                        if (e.currentTarget) {
                                            e.currentTarget.style.borderColor = '#2563eb';
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const error = validateField('name', e.currentTarget.value);
                                        if (error) {
                                            setErrors({ ...errors, name: error });
                                            e.currentTarget.style.borderColor = '#ef4444';
                                        } else {
                                            setErrors({ ...errors, name: '' });
                                            e.currentTarget.style.borderColor = '#cbd5e1';
                                        }
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                                {errors.name && (
                                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        borderRadius: '8px',
                                        border: `2px solid ${errors.email ? '#ef4444' : '#cbd5e1'}`,
                                        fontSize: '0.9375rem',
                                        transition: 'all 0.2s',
                                        outline: 'none',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => {
                                        if (e.currentTarget) {
                                            e.currentTarget.style.borderColor = '#2563eb';
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const error = validateField('email', e.currentTarget.value);
                                        if (error) {
                                            setErrors({ ...errors, email: error });
                                            e.currentTarget.style.borderColor = '#ef4444';
                                        } else {
                                            setErrors({ ...errors, email: '' });
                                            e.currentTarget.style.borderColor = '#cbd5e1';
                                        }
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                                {errors.email && (
                                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
                                    Company/Organization
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        borderRadius: '8px',
                                        border: '2px solid #cbd5e1',
                                        fontSize: '0.9375rem',
                                        transition: 'all 0.2s',
                                        outline: 'none',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => {
                                        if (e.currentTarget) {
                                            e.currentTarget.style.borderColor = '#2563eb';
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (e.currentTarget) {
                                            e.currentTarget.style.borderColor = '#cbd5e1';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+91 9876543210"
                                    pattern="[\d\s\-\+\(\)]+"
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem',
                                        borderRadius: '8px',
                                        border: `2px solid ${errors.phone ? '#ef4444' : '#cbd5e1'}`,
                                        fontSize: '0.9375rem',
                                        transition: 'all 0.2s',
                                        outline: 'none',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => {
                                        if (e.currentTarget) {
                                            e.currentTarget.style.borderColor = '#2563eb';
                                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const error = validateField('phone', e.currentTarget.value);
                                        if (error) {
                                            setErrors({ ...errors, phone: error });
                                            e.currentTarget.style.borderColor = '#ef4444';
                                        } else {
                                            setErrors({ ...errors, phone: '' });
                                            e.currentTarget.style.borderColor = '#cbd5e1';
                                        }
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                                {errors.phone && (
                                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
                                Country *
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    borderRadius: '8px',
                                    border: `2px solid ${errors.country ? '#ef4444' : '#cbd5e1'}`,
                                    fontSize: '0.9375rem',
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                    backgroundColor: '#ffffff'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#2563eb';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                }}
                                onBlur={(e) => {
                                    const error = validateField('country', e.currentTarget.value);
                                    if (error) {
                                        setErrors({ ...errors, country: error });
                                        e.currentTarget.style.borderColor = '#ef4444';
                                    } else {
                                        setErrors({ ...errors, country: '' });
                                        e.currentTarget.style.borderColor = '#cbd5e1';
                                    }
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            {errors.country && (
                                <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                                    {errors.country}
                                </p>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' }}>
                                Message / Requirements / Negotiations *
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                minLength={10}
                                placeholder="Please provide details about your requirements, quantities, specifications, pricing negotiations, delivery timeline, or any other details..."
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    borderRadius: '8px',
                                    border: `2px solid ${errors.message ? '#ef4444' : '#cbd5e1'}`,
                                    fontSize: '0.9375rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                    backgroundColor: '#ffffff'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#2563eb';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                }}
                                onBlur={(e) => {
                                    const error = validateField('message', e.currentTarget.value);
                                    if (error) {
                                        setErrors({ ...errors, message: error });
                                        e.currentTarget.style.borderColor = '#ef4444';
                                    } else {
                                        setErrors({ ...errors, message: '' });
                                        e.currentTarget.style.borderColor = '#cbd5e1';
                                    }
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            <p style={{ fontSize: '0.75rem', color: errors.message ? '#ef4444' : '#64748b', marginTop: '0.5rem' }}>
                                {errors.message || 'Minimum 10 characters required'}
                            </p>
                        </div>

                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    background: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
                                    border: `1px solid ${status.type === 'success' ? '#86efac' : '#fca5a5'}`,
                                    color: status.type === 'success' ? '#166534' : '#991b1b',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {status.message}
                            </motion.div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    flex: 1,
                                    padding: '0.875rem 1.5rem',
                                    background: loading ? '#94a3b8' : '#1a1a1a',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    fontSize: '0.9375rem',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {loading ? 'Sending...' : 'Send Inquiry'}
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={onClose}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    padding: '0.875rem 1.5rem',
                                    background: 'transparent',
                                    color: '#64748b',
                                    border: '1.5px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontWeight: 500,
                                    fontSize: '0.9375rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

