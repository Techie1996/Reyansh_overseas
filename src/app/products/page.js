// "use client";

// import Products from '../sections/Products';
// import HeroHeader from '../sections/HeroHeader';
// import NavMenu from '../sections/NavMenu';
// import Image from 'next/image';
// import Link from 'next/link'; // Add this import
// import { useState } from 'react';

// export default function ProductsPage() {
//     const [menuOpen, setMenuOpen] = useState(false);
//     function handleNavClick(e, id) {
//         e.preventDefault();
//         setMenuOpen(false);
//         const el = document.getElementById(id);
//         if (el) {
//             el.scrollIntoView({ behavior: 'smooth' });
//         }
//     }
//     function handleBrochure(e) {
//         e.preventDefault();
//         const link = document.createElement('a');
//         link.href = '/sample-local-pdf.pdf';
//         link.download = 'brochure.pdf';
//         link.target = '_blank';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         setMenuOpen(false);
//     }

//     return (
//         <>
//             <header style={{ borderBottom: '1px solid #eee', background: '#fff', position: 'relative', zIndex: 10 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 5vw', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2 }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//                         <Image src="/window.svg" alt="Reyansh Scientific Works Logo" width={60} height={60} />
//                         <div style={{ fontWeight: 'bold', fontSize: 24, lineHeight: 1.1, color: '#111' }}>
//                             Reyansh<br />Scientific<br />Works
//                         </div>
//                     </div>
//                     <>
//                         {/* Hamburger for mobile */}
//                         <button
//                             onClick={() => setMenuOpen(!menuOpen)}
//                             style={{
//                                 display: 'none',
//                                 background: 'none',
//                                 border: 'none',
//                                 fontSize: 32,
//                                 cursor: 'pointer',
//                                 marginLeft: 16,
//                             }}
//                             className="nav-hamburger"
//                             aria-label="Open navigation menu"
//                         >
//                             &#9776;
//                         </button>
//                         <nav
//                             style={{
//                                 display: 'flex',
//                                 gap: 32,
//                                 fontSize: 18,
//                                 alignItems: 'center',
//                             }}
//                             className={menuOpen ? 'nav-open' : ''}
//                         >
//                             <a href="/" onClick={e => handleNavClick(e, 'home')} style={{ textDecoration: 'underline', textUnderlineOffset: 4, color: '#111' }}>Home</a>
//                             <a href="/" onClick={e => handleNavClick(e, 'about')} style={{ color: '#111' }}>About</a>
//                             <Link href="/products" style={{ color: '#111', cursor: 'pointer' }}>Products</Link>
//                             <a href="/" onClick={e => handleNavClick(e, 'contact')} style={{ color: '#111' }}>Contact Us</a>
//                             <a href="/" onClick={handleBrochure} className="nav-brochure-desktop" style={{ background: '#000', color: '#fff', padding: '0.5rem 2rem', borderRadius: 24, fontWeight: 'bold', textDecoration: 'none', fontSize: 18, marginLeft: 16 }}>Brochure</a>
//                         </nav>
//                         {/* Mobile menu overlay */}
//                         {menuOpen && (
//                             <div className="nav-mobile-menu" style={{
//                                 position: 'fixed',
//                                 top: 0,
//                                 left: 0,
//                                 width: '100vw',
//                                 height: '100vh',
//                                 background: 'rgba(255,255,255,0.98)',
//                                 zIndex: 9999,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 justifyContent: 'flex-start',
//                                 paddingTop: 32,
//                             }}>
//                                 <a href="#" onClick={handleBrochure} style={{ background: '#000', color: '#fff', padding: '0.7rem 2.2rem', borderRadius: 24, fontWeight: 'bold', textDecoration: 'none', fontSize: 20, marginBottom: 32 }}>Brochure</a>
//                                 <a href="#home" onClick={e => handleNavClick(e, 'home')} style={{ color: '#111', fontSize: 22, margin: '16px 0' }}>Home</a>
//                                 <a href="#about" onClick={e => handleNavClick(e, 'about')} style={{ color: '#111', fontSize: 22, margin: '16px 0' }}>About</a>
//                                 <Link href="/products" style={{ color: '#111', fontSize: 22, margin: '16px 0', cursor: 'pointer' }} onClick={() => setMenuOpen(false)}>Products</Link>
//                                 <a href="#contact" onClick={e => handleNavClick(e, 'contact')} style={{ color: '#111', fontSize: 22, margin: '16px 0' }}>Contact Us</a>
//                                 <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 18, right: 24, fontSize: 32, background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Close menu">&times;</button>
//                             </div>
//                         )}
//                         <style>{`
//         @media (max-width: 900px) {
//           nav {
//             display: none !important;
//           }
//           .nav-hamburger {
//             display: block !important;
//           }
//           .nav-brochure-desktop {
//             display: none !important;
//           }
//         }
//         @media (min-width: 901px) {
//           .nav-mobile-menu {
//             display: none !important;
//           }
//         }
//       `}</style>
//                     </>                </div>
//             </header>            <Products />
//         </>
//     );
// } 
"use client";

import Products from '../sections/Products';
import BackgroundMusic from '../components/BackgroundMusic';
import InquiryCart from '../components/InquiryCart';
import Notification from '../components/Notification';
import HeroHeader from '../sections/HeroHeader';

export default function ProductsPage() {
    return (
        <>
            <BackgroundMusic />
            <Notification />
            <InquiryCart />
            <HeroHeader />
            <Products />
        </>
    );
}