"use client";
import ContactForm from '../contact-form';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" style={{ 
            background: '#fafbff', 
            padding: 'clamp(3rem, 6vw, 6rem) 0', 
            position: 'relative', 
            overflow: 'hidden', 
            minHeight: 'clamp(500px, 60vh, 700px)' 
        }}>
            {/* Desktop background image with overlay */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '40%',
                zIndex: 0,
                display: 'none',
            }} className="contact-bg-desktop">
                <img
                    src="https://images.unsplash.com/photo-1517971071642-34a2d3eccb5e?auto=format&fit=crop&w=700&q=80"
                    alt="Scientific Glassware"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.35,
                        borderRadius: 0,
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg,rgba(255,255,255,0.7) 60%,rgba(255,255,255,0.1) 100%)',
                }} />
            </div>
            {/* Mobile background image */}
            <div style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: 32,
                display: 'block',
            }} className="contact-bg-mobile">
                <img
                    src="https://images.unsplash.com/photo-1517971071642-34a2d3eccb5e?auto=format&fit=crop&w=700&q=80"
                    alt="Scientific Glassware"
                    style={{
                        width: 180,
                        height: 60,
                        objectFit: 'cover',
                        opacity: 0.28,
                        borderRadius: 8,
                        margin: '0 auto',
                    }}
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'clamp(2rem, 4vw, 4rem)',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: 'clamp(1200px, 90vw, 1600px)',
                    margin: '0 auto',
                    padding: '0 clamp(1.5rem, 5vw, 8rem)'
                }}
            >
                {/* Info card with glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    style={{
                        flex: 1,
                        minWidth: 'clamp(280px, 40vw, 400px)',
                        maxWidth: 'clamp(400px, 45vw, 550px)',
                        padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                        background: 'rgba(255,255,255,0.7)',
                        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
                        borderRadius: 18,
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        marginBottom: 24,
                    }}>
                    <h2 style={{ 
                        fontFamily: 'Montserrat, Arial, sans-serif', 
                        fontSize: 'clamp(1.75rem, 3vw + 1rem, 3rem)', 
                        fontWeight: 800, 
                        marginBottom: 'clamp(0.5rem, 1vw, 1rem)', 
                        color: '#111', 
                        letterSpacing: 1, 
                        textAlign: 'center' 
                    }}>✱ Let's Talk</h2>
                    <div style={{ 
                        marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)', 
                        color: '#222', 
                        fontSize: 'clamp(1rem, 1.2vw + 0.5rem, 1.25rem)', 
                        textAlign: 'center' 
                    }}>
                        Contact us today to discuss your business needs.
                    </div>
                    <div style={{ 
                        marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)', 
                        fontSize: 'clamp(0.9375rem, 1.1vw + 0.5rem, 1.125rem)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: 10, 
                        flexWrap: 'wrap' 
                    }}>
                        <span style={{ fontSize: 'clamp(24px, 2.5vw, 32px)' }}>🏢</span>
                        <span style={{ textAlign: 'center' }}>Ambala Cantt, Haryana, 133001</span>
                    </div>
                    <div style={{ 
                        marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)', 
                        fontSize: 'clamp(0.9375rem, 1.1vw + 0.5rem, 1.125rem)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: 10, 
                        flexWrap: 'wrap' 
                    }}>
                        <span style={{ fontSize: 'clamp(24px, 2.5vw, 32px)' }}>📧</span>
                        <span style={{ textAlign: 'center' }}>
                            krishnawanshioverseas@gmail.com<br />krishnawanshioverseas2@gmail.com
                        </span>
                    </div>
                    <div style={{ 
                        marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)', 
                        fontSize: 'clamp(0.9375rem, 1.1vw + 0.5rem, 1.125rem)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: 10, 
                        flexWrap: 'wrap' 
                    }}>
                        <span style={{ fontSize: 'clamp(24px, 2.5vw, 32px)' }}>📞</span>
                        <span style={{ textAlign: 'center' }}>+91- 989699933</span>
                    </div>
                    <div style={{ 
                        marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)', 
                        textAlign: 'center' 
                    }}>
                        <b style={{ fontSize: 'clamp(0.9375rem, 1.1vw + 0.5rem, 1.125rem)' }}>Follow us on Social</b><br />
                        <span style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', marginRight: 8 }}>📸</span>
                        <span style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', marginRight: 8 }}>📘</span>
                        <span style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}>🔗</span>
                    </div>
                </motion.div>
                {/* Contact form card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    style={{ 
                        flex: 1, 
                        minWidth: 'clamp(280px, 40vw, 500px)', 
                        maxWidth: 'clamp(500px, 50vw, 700px)', 
                        padding: 'clamp(1.5rem, 2.5vw, 2.5rem)', 
                        width: '100%', 
                        boxSizing: 'border-box' 
                    }}
                >
                    <div style={{
                        background: 'rgba(255,255,255,0.85)',
                        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                        borderRadius: 18,
                        padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        width: '100%',
                        boxSizing: 'border-box',
                        overflow: 'hidden'
                    }}>
                        <ContactForm />
                    </div>
                </motion.div>
            </motion.div>
            <style>{`
        @media (min-width: 900px) {
          .contact-bg-desktop { display: block !important; }
          .contact-bg-mobile { display: none !important; }
        }
        @media (max-width: 899px) {
          .contact-bg-desktop { display: none !important; }
          .contact-bg-mobile { display: block !important; }
          section#contact > div[style*='display: flex'] {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          section#contact > div > div {
            text-align: center !important;
            max-width: 100% !important;
          }
          section#contact h2,
          section#contact p,
          section#contact div {
            text-align: center !important;
          }
        }
        @keyframes fadeInContact {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
} 