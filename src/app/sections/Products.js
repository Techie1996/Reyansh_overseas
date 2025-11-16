"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { allProducts } from '../data/products';

function ProductCard({ product, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                whileHover={{
                    y: -8,
                    scale: 1.01,
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: '#2563eb'
                }}
                onClick={(e) => {
                    // Allow add to inquiry button to work
                    if (e.target.closest('button')) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }}
                style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: '16px',
                    padding: 0,
                    cursor: 'pointer',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <div style={{
                    width: '100%',
                    height: '240px',
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <img
                        src={product.img}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease'
                        }}
                        loading="lazy"
                        decoding="async"
                        onMouseEnter={(e) => {
                            if (e.currentTarget) {
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (e.currentTarget) {
                                e.currentTarget.style.transform = 'scale(1)';
                            }
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 100%)'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#2563eb',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        Premium
                    </div>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                        fontWeight: 700,
                        fontSize: '1.375rem',
                        marginBottom: '0.75rem',
                        color: '#0f172a',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2
                    }}>
                        {product.name}
                    </h3>
                    <p style={{
                        fontSize: '0.9375rem',
                        color: '#64748b',
                        lineHeight: 1.7,
                        margin: 0,
                        flex: 1,
                        marginBottom: '1.5rem'
                    }}>
                        {product.desc}
                    </p>

                    <motion.button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (window.addProductToInquiry) {
                                window.addProductToInquiry({
                                    name: product.name,
                                    desc: product.desc
                                });
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1.5rem',
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '0.9375rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>Add to Inquiry</span>
                        <span style={{ fontSize: '1.2rem' }}>→</span>
                    </motion.button>
                </div>
            </motion.div>
        </Link>
    );
}

export default function Products() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} id="products" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            color: '#1a1a1a',
            padding: '6rem 0',
            position: 'relative'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '400px',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(30, 64, 175, 0.01) 100%)',
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 5vw', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    style={{ textAlign: 'center', marginBottom: '1rem' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 700,
                        margin: 0,
                        color: '#0f172a',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        marginBottom: '1rem'
                    }}>
                        Premium Laboratory Glassware
                    </h2>
                    <p style={{
                        fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
                        color: '#64748b',
                        marginTop: '1rem',
                        maxWidth: 700,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: 1.6
                    }}>
                        Precision-engineered scientific glassware for research, pharmaceutical, and industrial applications. Click on any product to view detailed specifications and applications.
                    </p>
                </motion.div>

                <div className="products-original-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    maxWidth: 1400,
                    margin: '0 auto'
                }}>
                    {allProducts.map((p, i) => (
                        <ProductCard key={p.slug} product={p} index={i} />
                    ))}
                </div>
            </div>
            <style>{`
        @media (max-width: 768px) {
          .products-original-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .products-original-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }
        @media (min-width: 1400px) {
          .products-original-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
        </section>
    );
} 