"use client";
import Image from 'next/image';
import NavMenu from './NavMenu';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function HeroHeader() {
    const heroRef = useRef(null);
    const pathname = usePathname();
    const isProductsPage = pathname?.includes('/products');

    return (
        <header style={{
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            background: '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.95)'
        }}>
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(1rem, 2vw, 2rem) clamp(1.5rem, 5vw, 8rem)',
                    maxWidth: 1600,
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <motion.div
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 16px)', cursor: 'pointer' }}
                >
                    <img
                        src="/4118.jpg"
                        alt="Krishnawanshi Overseas - Laboratory Glassware Manufacturer Logo"
                        title="Krishnawanshi Overseas - Premium Laboratory Glassware"
                        width={50}
                        height={50}
                        style={{ 
                            borderRadius: 8,
                            width: 'clamp(40px, 4vw, 60px)',
                            height: 'clamp(40px, 4vw, 60px)'
                        }}
                    />
                    <div style={{
                        fontWeight: 600,
                        fontSize: 'clamp(16px, 2vw, 24px)',
                        lineHeight: 1.2,
                        color: '#1a1a1a',
                        letterSpacing: '-0.02em'
                    }}>
                        Krishnawanshi<br />
                        <span style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', color: '#64748b', fontWeight: 400 }}>Overseas</span>
                    </div>
                </motion.div>
                <NavMenu />
            </motion.div>
            {!isProductsPage && (
                <section
                    ref={heroRef}
                    id="home"
                    style={{
                        position: 'relative',
                        width: '100%',
                        minHeight: 'clamp(600px, 85vh, 900px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
                        overflow: 'hidden',
                        padding: 'clamp(2rem, 4vw, 4rem) 0'
                    }}
                >
                    {/* Subtle background elements */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(37, 99, 235, 0.04) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                        opacity: 0.6
                    }} />

                    {/* Accent gradient circles */}
                    <div style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(60px)'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: '-5%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(50px)'
                    }} />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            textAlign: 'center',
                            width: '100%',
                            maxWidth: 'clamp(1000px, 90vw, 1400px)',
                            padding: '0 clamp(1.5rem, 5vw, 8rem)'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 5vw + 1rem, 6rem)',
                                fontWeight: 800,
                                margin: 0,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.1,
                                color: '#0f172a',
                                marginBottom: 'clamp(1rem, 2vw, 2rem)'
                            }}>
                                Precision Glassware<br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    display: 'inline-block'
                                }}>Manufacturing Excellence</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            style={{
                                fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.75rem)',
                                marginTop: '1rem',
                                color: '#475569',
                                fontWeight: 400,
                                lineHeight: 1.8,
                                maxWidth: 'clamp(600px, 70vw, 900px)',
                                margin: 'clamp(1.5rem, 3vw, 3rem) auto 0'
                            }}
                        >
                            Leading manufacturer of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications worldwide.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            style={{
                                marginTop: 'clamp(2rem, 4vw, 4rem)',
                                display: 'flex',
                                gap: 'clamp(1rem, 2vw, 1.5rem)',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <motion.a
                                href="#products"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('products');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0f172a 100%)',
                                    color: '#ffffff',
                                    padding: 'clamp(0.875rem, 1.5vw, 1.25rem) clamp(2rem, 4vw, 3.5rem)',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: 'clamp(1rem, 1.2vw + 0.5rem, 1.375rem)',
                                    display: 'inline-block',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    cursor: 'pointer'
                                }}
                            >
                                View Products →
                            </motion.a>
                            <motion.a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('contact');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: '#ffffff',
                                    color: '#1a1a1a',
                                    padding: 'clamp(0.875rem, 1.5vw, 1.25rem) clamp(2rem, 4vw, 3.5rem)',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: 'clamp(1rem, 1.2vw + 0.5rem, 1.375rem)',
                                    display: 'inline-block',
                                    border: '2px solid #e2e8f0',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                }}
                            >
                                Contact Us
                            </motion.a>
                        </motion.div>

                        {/* Stats bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            style={{
                                marginTop: 'clamp(2.5rem, 4vw, 5rem)',
                                display: 'flex',
                                gap: 'clamp(2rem, 4vw, 4rem)',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                padding: 'clamp(2rem, 3vw, 3.5rem)',
                                background: 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                border: '1px solid rgba(37, 99, 235, 0.1)',
                                maxWidth: 'clamp(700px, 80vw, 1000px)',
                                margin: 'clamp(2.5rem, 4vw, 5rem) auto 0',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 'clamp(2rem, 3vw + 0.5rem, 3.5rem)', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>12+</div>
                                <div style={{ fontSize: 'clamp(0.75rem, 0.8vw + 0.5rem, 1rem)', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>Years Experience</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 'clamp(2rem, 3vw + 0.5rem, 3.5rem)', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>500+</div>
                                <div style={{ fontSize: 'clamp(0.75rem, 0.8vw + 0.5rem, 1rem)', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>Global Clients</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 'clamp(2rem, 3vw + 0.5rem, 3.5rem)', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>ISO</div>
                                <div style={{ fontSize: 'clamp(0.75rem, 0.8vw + 0.5rem, 1rem)', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>Certified</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>
            )}
        </header>
    );
} 