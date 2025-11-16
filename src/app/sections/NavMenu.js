"use client";
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

export default function NavMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === '/';
    const isProductsPage = pathname?.includes('/products');

    function handleNavClick(e, id) {
        e.preventDefault();
        setMenuOpen(false);

        // If we're on products page, navigate to home first
        if (pathname?.includes('/products')) {
            router.push(`/#${id}`);
            // Wait for navigation then scroll
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
            return;
        }

        const el = document.getElementById(id);
        if (el) {
            // Use requestAnimationFrame for smoother scroll
            requestAnimationFrame(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }
    function handleBrochure(e) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = '/Kanha_Scientific.pdf';
        link.download = 'brochure.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMenuOpen(false);
    }
    return (
        <>
            {/* Hamburger for mobile */}
            <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    display: 'none',
                    background: 'none',
                    border: 'none',
                    fontSize: 32,
                    cursor: 'pointer',
                    marginLeft: 16,
                }}
                className="nav-hamburger"
                aria-label="Open navigation menu"
            >
                &#9776;
            </motion.button>
            <nav
                style={{
                    display: 'flex',
                    gap: 32,
                    fontSize: 18,
                    alignItems: 'center',
                }}
                className={menuOpen ? 'nav-open' : ''}
            >
                {isHomePage ? (
                    <motion.a
                        href="#home"
                        onClick={e => handleNavClick(e, 'home')}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            textDecoration: 'underline',
                            textUnderlineOffset: 4,
                            color: '#2563eb',
                            fontWeight: 600,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Home
                    </motion.a>
                ) : (
                    <Link
                        href="/#home"
                        style={{
                            textDecoration: 'none',
                            color: '#111',
                            fontWeight: 400,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <motion.span whileHover={{ scale: 1.05 }}>Home</motion.span>
                    </Link>
                )}
                {isHomePage ? (
                    <motion.a
                        href="#about"
                        onClick={e => handleNavClick(e, 'about')}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            color: '#111',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                        }}
                    >
                        About
                    </motion.a>
                ) : (
                    <Link
                        href="/#about"
                        style={{
                            textDecoration: 'none',
                            color: '#111',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <motion.span whileHover={{ scale: 1.05 }}>About</motion.span>
                    </Link>
                )}
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                        href="/products"
                        style={{
                            color: isProductsPage ? '#2563eb' : '#111',
                            cursor: 'pointer',
                            textDecoration: isProductsPage ? 'underline' : 'none',
                            textUnderlineOffset: 4,
                            fontWeight: isProductsPage ? 600 : 400,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Products
                    </Link>
                </motion.div>
                {isHomePage ? (
                    <motion.a
                        href="#contact"
                        onClick={e => handleNavClick(e, 'contact')}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            color: '#111',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                        }}
                    >
                        Contact Us
                    </motion.a>
                ) : (
                    <Link
                        href="/#contact"
                        style={{
                            textDecoration: 'none',
                            color: '#111',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <motion.span whileHover={{ scale: 1.05 }}>Contact Us</motion.span>
                    </Link>
                )}
                <motion.a
                    href="#"
                    onClick={handleBrochure}
                    className="nav-brochure-desktop"
                    whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: '#000', color: '#fff', padding: '0.5rem 2rem', borderRadius: 24, fontWeight: 'bold', textDecoration: 'none', fontSize: 18, marginLeft: 16, transition: 'all 0.3s ease' }}
                >
                    Brochure
                </motion.a>
            </nav>
            {/* Mobile menu overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="nav-mobile-menu"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: '#ffffff',
                            zIndex: 9999,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
                            overflowY: 'auto'
                        }}>
                        <motion.button
                            onClick={() => setMenuOpen(false)}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                fontSize: '2rem',
                                background: 'rgba(0,0,0,0.05)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#1a1a1a'
                            }}
                            aria-label="Close menu"
                        >
                            &times;
                        </motion.button>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            width: '100%',
                            maxWidth: '400px'
                        }}>
                            <motion.a
                                href="#"
                                onClick={handleBrochure}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: '#1a1a1a',
                                    color: '#fff',
                                    padding: '1rem 2.5rem',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: '1.125rem',
                                    width: '100%',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}
                            >
                                📄 Brochure
                            </motion.a>

                            {isHomePage ? (
                                <>
                                    <motion.a
                                        href="#home"
                                        onClick={e => handleNavClick(e, 'home')}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            color: '#2563eb',
                                            fontWeight: 700,
                                            fontSize: '1.75rem',
                                            textDecoration: 'none',
                                            padding: '1.25rem 2rem',
                                            borderRadius: '12px',
                                            background: 'rgba(37, 99, 235, 0.15)',
                                            border: '2px solid rgba(37, 99, 235, 0.3)',
                                            width: '100%',
                                            textAlign: 'center',
                                            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
                                        }}
                                    >
                                        Home
                                    </motion.a>
                                    <motion.a
                                        href="#about"
                                        onClick={e => handleNavClick(e, 'about')}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            color: '#0f172a',
                                            fontSize: '1.75rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            padding: '1.25rem 2rem',
                                            borderRadius: '12px',
                                            width: '100%',
                                            textAlign: 'center',
                                            background: '#f8fafc',
                                            border: '2px solid #e2e8f0',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                        }}
                                    >
                                        About
                                    </motion.a>
                                    <motion.a
                                        href="#contact"
                                        onClick={e => handleNavClick(e, 'contact')}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            color: '#0f172a',
                                            fontSize: '1.75rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            padding: '1.25rem 2rem',
                                            borderRadius: '12px',
                                            width: '100%',
                                            textAlign: 'center',
                                            background: '#f8fafc',
                                            border: '2px solid #e2e8f0',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                        }}
                                    >
                                        Contact Us
                                    </motion.a>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/#home"
                                        style={{
                                            color: '#0f172a',
                                            fontSize: '1.75rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            padding: '1.25rem 2rem',
                                            borderRadius: '12px',
                                            width: '100%',
                                            textAlign: 'center',
                                            background: '#f8fafc',
                                            border: '2px solid #e2e8f0',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                        }}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/#about"
                                        style={{
                                            color: '#0f172a',
                                            fontSize: '1.75rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            padding: '1.25rem 2rem',
                                            borderRadius: '12px',
                                            width: '100%',
                                            textAlign: 'center',
                                            background: '#f8fafc',
                                            border: '2px solid #e2e8f0',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                        }}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href="/#contact"
                                        style={{
                                            color: '#0f172a',
                                            fontSize: '1.75rem',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            padding: '1.25rem 2rem',
                                            borderRadius: '12px',
                                            width: '100%',
                                            textAlign: 'center',
                                            background: '#f8fafc',
                                            border: '2px solid #e2e8f0',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                        }}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Contact Us
                                    </Link>
                                </>
                            )}
                            <Link
                                href="/products"
                                style={{
                                    color: isProductsPage ? '#2563eb' : '#0f172a',
                                    fontWeight: isProductsPage ? 700 : 600,
                                    fontSize: '1.75rem',
                                    textDecoration: 'none',
                                    padding: '1.25rem 2rem',
                                    borderRadius: '12px',
                                    background: isProductsPage ? 'rgba(37, 99, 235, 0.15)' : '#f8fafc',
                                    border: isProductsPage ? '2px solid rgba(37, 99, 235, 0.3)' : '2px solid #e2e8f0',
                                    width: '100%',
                                    textAlign: 'center',
                                    boxShadow: isProductsPage ? '0 2px 8px rgba(37, 99, 235, 0.2)' : '0 2px 8px rgba(0,0,0,0.08)'
                                }}
                                onClick={() => setMenuOpen(false)}
                            >
                                Products
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
        @media (max-width: 900px) {
          nav {
            display: none !important;
          }
          .nav-hamburger {
            display: block !important;
          }
          .nav-brochure-desktop {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .nav-mobile-menu {
            display: none !important;
          }
        }
      `}</style>
        </>
    );
} 