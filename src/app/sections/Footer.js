"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ background: '#fff', borderTop: '1px solid #eee', padding: '2vw 0', fontSize: 16 }}
        >
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                maxWidth: 1400, 
                margin: '0 auto', 
                gap: '2rem', 
                padding: '3rem 5vw'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                        minWidth: 220, 
                        flex: '1 1 250px', 
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}
                >
                    <motion.img
                        src="/4118.jpg"
                        alt="Scientific Glassware Logo"
                        width={60}
                        height={60}
                        style={{ borderRadius: '50%', marginBottom: 8 }}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <div style={{ fontWeight: 'bold', marginTop: 8, fontSize: '1.125rem' }}>Krishnawanshi Overseas</div>
                    <div style={{ marginTop: 8, fontSize: 15, textDecoration: 'underline', color: '#64748b' }}>ISO Certified Scientific Company</div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ 
                        minWidth: 180, 
                        flex: '1 1 200px', 
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}
                >
                    <div style={{ fontWeight: 'bold', color: '#4285f4', fontSize: '1.25rem', marginBottom: '1rem' }}>Quick Links</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                        <motion.a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('home');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            whileHover={{ scale: 1.05 }}
                            style={{ textDecoration: 'none', color: '#333', transition: 'color 0.3s', cursor: 'pointer', fontSize: '1rem' }}
                        >
                            Home
                        </motion.a>
                        <motion.a
                            href="#about"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('about');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            whileHover={{ scale: 1.05 }}
                            style={{ textDecoration: 'none', color: '#333', transition: 'color 0.3s', cursor: 'pointer', fontSize: '1rem' }}
                        >
                            About
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link href="/products" style={{ textDecoration: 'none', color: '#333', transition: 'color 0.3s', fontSize: '1rem' }}>Products</Link>
                        </motion.div>
                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('contact');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            whileHover={{ scale: 1.05 }}
                            style={{ textDecoration: 'none', color: '#333', transition: 'color 0.3s', cursor: 'pointer', fontSize: '1rem' }}
                        >
                            Contact Us
                        </motion.a>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ 
                        minWidth: 280, 
                        flex: '1 1 300px', 
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}
                >
                    <motion.iframe
                        title="Krishnawanshi Overseas Map"
                        src="https://www.google.com/maps?q=Kaccha+Bazar+Ambala+Cantt,+Haryana,+133001&output=embed"
                        width="100%"
                        height="180"
                        style={{ border: 0, borderRadius: 8, maxWidth: '100%' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    ></motion.iframe>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ textAlign: 'center', color: '#888', marginTop: 16 }}
            >
                © 2024 Krishnawanshi
                Overseas All Right Reserved
            </motion.div>
        </motion.footer>
    );
} 