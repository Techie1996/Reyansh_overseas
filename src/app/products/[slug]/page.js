"use client";
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductInquiry from '../../components/ProductInquiry';
import InquiryCart from '../../components/InquiryCart';
import BackgroundMusic from '../../components/BackgroundMusic';
import Notification from '../../components/Notification';
import HeroHeader from '../../sections/HeroHeader';
import Footer from '../../sections/Footer';
import { allProducts as productsList } from '../../data/products';
import Script from 'next/script';

const allProducts = {
    'beaker': {
        name: 'Beaker',
        desc: '100ml, 250ml, 500ml, 1000ml',
        img: 'https://images.pexels.com/photos/4021087/pexels-photo-4021087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Made from high-quality borosilicate glass',
            'Heat resistant up to 500°C',
            'Precision graduated markings',
            'Available in multiple sizes: 100ml, 250ml, 500ml, 1000ml',
            'ISO certified quality standards',
            'Suitable for laboratory and industrial use'
        ],
        applications: [
            'Chemical mixing and reactions',
            'Sample preparation',
            'Heating and boiling liquids',
            'Volume measurements',
            'Educational laboratories'
        ]
    },
    'flask': {
        name: 'Flask',
        desc: '250ml, 500ml, 1000ml',
        img: 'https://images.pexels.com/photos/4021088/pexels-photo-4021088.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Erlenmeyer design for optimal mixing',
            'Borosilicate glass construction',
            'Wide base for stability',
            'Available sizes: 250ml, 500ml, 1000ml',
            'Autoclavable',
            'Chemical resistant'
        ],
        applications: [
            'Titration procedures',
            'Culture media preparation',
            'Chemical synthesis',
            'Sample storage',
            'Research laboratories'
        ]
    },
    'test-tube': {
        name: 'Test Tube',
        desc: '5ml, 10ml, 20ml, 50ml',
        img: 'https://images.pexels.com/photos/4021089/pexels-photo-4021089.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Round bottom design',
            'Multiple capacity options: 5ml, 10ml, 20ml, 50ml',
            'Made from clear borosilicate glass',
            'Uniform wall thickness',
            'Compatible with standard racks',
            'Heat resistant'
        ],
        applications: [
            'Sample analysis',
            'Chemical reactions',
            'Biological testing',
            'Quality control',
            'Educational purposes'
        ]
    },
    'condenser': {
        name: 'Double Surface Condenser',
        desc: '100mm, 150mm, 200mm, 300mm, 400mm, 500mm',
        img: 'https://images.pexels.com/photos/4021090/pexels-photo-4021090.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Double surface design for efficient cooling',
            'Available lengths: 100mm to 500mm',
            'Standard ground glass joints',
            'High cooling efficiency',
            'Durable construction',
            'Compatible with standard setups'
        ],
        applications: [
            'Distillation processes',
            'Reflux reactions',
            'Solvent recovery',
            'Chemical synthesis',
            'Industrial processes'
        ]
    },
    'burettes': {
        name: 'Burettes',
        desc: 'Glass Stopcock / Rotaflow - 5ml, 10ml, 25ml, 50ml, 100ml',
        img: 'https://images.pexels.com/photos/4021091/pexels-photo-4021091.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Precision graduated markings',
            'Available with glass stopcock or rotaflow',
            'Multiple capacities: 5ml to 100ml',
            'High accuracy (±0.05ml)',
            'PTFE stopcock for smooth operation',
            'Class A certification available'
        ],
        applications: [
            'Volumetric analysis',
            'Titration procedures',
            'Precise liquid dispensing',
            'Quality control testing',
            'Research laboratories'
        ]
    },
    'pipettes': {
        name: 'Pipettes',
        desc: 'Graduated / Volumetric - 1.0ml, 2.0ml, 5.0ml, 10.0ml, 25.0ml, 50.0ml',
        img: 'https://images.pexels.com/photos/4021092/pexels-photo-4021092.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Available in graduated and volumetric types',
            'Precision calibration',
            'Multiple sizes: 1ml to 50ml',
            'Class A and Class B options',
            'Clear, easy-to-read markings',
            'ISO certified'
        ],
        applications: [
            'Precise liquid transfer',
            'Sample preparation',
            'Analytical procedures',
            'Dilution processes',
            'Laboratory measurements'
        ]
    },
    'culture-tubes-rb': {
        name: 'Culture Tubes (RB)',
        desc: 'Clear Glass / Amber - 5ml, 10ml, 30ml, 60ml, 150ml',
        img: 'https://images.pexels.com/photos/4021093/pexels-photo-4021093.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Round bottom design',
            'Available in clear glass and amber',
            'Multiple sizes: 5ml to 150ml',
            'Autoclavable',
            'Light protection with amber option',
            'Compatible with standard caps'
        ],
        applications: [
            'Microbial culture',
            'Cell culture',
            'Sample storage',
            'Biological research',
            'Pharmaceutical testing'
        ]
    },
    'culture-tubes-fb': {
        name: 'Culture Tubes (FB)',
        desc: 'Clear Glass / Amber - 5ml, 10ml, 30ml, 60ml, 150ml',
        img: 'https://images.pexels.com/photos/4021094/pexels-photo-4021094.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        specifications: [
            'Flat bottom design for stability',
            'Available in clear glass and amber',
            'Multiple sizes: 5ml to 150ml',
            'Autoclavable',
            'Light protection with amber option',
            'Stand-alone capability'
        ],
        applications: [
            'Microbial culture',
            'Cell culture',
            'Sample storage',
            'Biological research',
            'Pharmaceutical testing'
        ]
    }
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;
    
    // Find product from the list
    const productFromList = productsList.find(p => p.slug === slug);
    const product = productFromList || allProducts[slug];

    const [showInquiry, setShowInquiry] = useState(false);

    useEffect(() => {
        if (!product) {
            router.push('/products');
        }
    }, [product, router]);

    const handleAddToInquiry = () => {
        if (window.addProductToInquiry) {
            window.addProductToInquiry({
                name: product.name,
                desc: product.desc
            });
            setShowInquiry(true);
        }
    };

    if (!product) return null;

    // Structured Data for Product
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": `${product.name} - ${product.desc}. ${product.specifications.join('. ')}`,
        "image": product.img,
        "brand": {
            "@type": "Brand",
            "name": "Krishnawanshi Overseas"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Krishnawanshi Overseas",
            "url": "https://krishnawanshioverseas.com"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://krishnawanshioverseas.com/products/${slug}`,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Krishnawanshi Overseas"
            }
        },
        "category": "Laboratory Equipment",
        "applicationCategory": "Scientific Research",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
        }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://krishnawanshioverseas.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://krishnawanshioverseas.com/products"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": `https://krishnawanshioverseas.com/products/${slug}`
            }
        ]
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <BackgroundMusic />
            <Notification />
            <InquiryCart />
            <HeroHeader />
            <div style={{ 
                maxWidth: 'clamp(1200px, 90vw, 1400px)', 
                margin: '0 auto', 
                padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 8rem)',
                minHeight: 'calc(100vh - 200px)'
            }}>
                {/* Breadcrumbs */}
                <motion.nav 
                    aria-label="Breadcrumb" 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                    <ol style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(0.5rem, 1vw, 0.75rem)',
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        flexWrap: 'wrap'
                    }}>
                        <li>
                            <Link
                                href="/"
                                style={{
                                    color: '#64748b',
                                    textDecoration: 'none',
                                    fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)',
                                    fontWeight: 500,
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                            >
                                Home
                            </Link>
                        </li>
                        <li style={{ color: '#64748b', fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)' }}>/</li>
                        <li>
                            <Link
                                href="/products"
                                style={{
                                    color: '#64748b',
                                    textDecoration: 'none',
                                    fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)',
                                    fontWeight: 500,
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                            >
                                Products
                            </Link>
                        </li>
                        <li style={{ color: '#64748b', fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)' }}>/</li>
                        <li style={{
                            color: '#0f172a',
                            fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)',
                            fontWeight: 600
                        }}>
                            {product.name}
                        </li>
                    </ol>
                </motion.nav>

                {/* Main Product Section */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'clamp(1fr, 50vw, 1fr) clamp(1fr, 50vw, 1fr)',
                    gap: 'clamp(2rem, 4vw, 4rem)',
                    marginBottom: 'clamp(3rem, 5vw, 5rem)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            borderRadius: 'clamp(16px, 2vw, 24px)',
                            padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: '1',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                            border: '1px solid rgba(37, 99, 235, 0.1)'
                        }}
                    >
                        <img
                            src={product.img}
                            alt={`${product.name} - Laboratory Glassware by Krishnawanshi Overseas. ${product.desc}`}
                            title={`${product.name} - ${product.desc}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 'clamp(8px, 1vw, 12px)',
                                transition: 'transform 0.3s ease'
                            }}
                            loading="eager"
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{
                            position: 'absolute',
                            top: 'clamp(1rem, 1.5vw, 1.5rem)',
                            right: 'clamp(1rem, 1.5vw, 1.5rem)',
                            background: 'rgba(37, 99, 235, 0.9)',
                            color: '#ffffff',
                            padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 1.5vw, 1.5rem)',
                            borderRadius: '20px',
                            fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                        }}>
                            ⭐ Premium Quality
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                            <h1 style={{
                                fontSize: 'clamp(2rem, 4vw + 1rem, 3.5rem)',
                                fontWeight: 700,
                                color: '#0f172a',
                                marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2
                            }}>
                                {product.name}
                            </h1>
                            <p style={{
                                fontSize: 'clamp(1rem, 1.3vw + 0.5rem, 1.375rem)',
                                color: '#64748b',
                                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                                lineHeight: 1.6
                            }}>
                                {product.desc}
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: 'clamp(0.75rem, 1.5vw, 1rem)',
                                flexWrap: 'wrap',
                                marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)'
                            }}>
                                <span style={{
                                    background: 'rgba(37, 99, 235, 0.1)',
                                    color: '#2563eb',
                                    padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 1.5vw, 1.5rem)',
                                    borderRadius: '20px',
                                    fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                                    fontWeight: 600
                                }}>
                                    ✓ ISO Certified
                                </span>
                                <span style={{
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981',
                                    padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 1.5vw, 1.5rem)',
                                    borderRadius: '20px',
                                    fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                                    fontWeight: 600
                                }}>
                                    ✓ Worldwide Shipping
                                </span>
                                <span style={{
                                    background: 'rgba(245, 158, 11, 0.1)',
                                    color: '#f59e0b',
                                    padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 1.5vw, 1.5rem)',
                                    borderRadius: '20px',
                                    fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                                    fontWeight: 600
                                }}>
                                    ⭐ 4.8 Rating
                                </span>
                            </div>
                        </div>

                        <div style={{ 
                            marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                            background: '#ffffff',
                            borderRadius: 'clamp(12px, 1.5vw, 16px)',
                            padding: 'clamp(1.25rem, 2vw, 1.75rem)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h2 style={{
                                fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)',
                                fontWeight: 700,
                                color: '#0f172a',
                                marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span style={{ fontSize: '1.5em' }}>🔬</span>
                                Specifications
                            </h2>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'clamp(0.75rem, 1vw, 1rem)'
                            }}>
                                {product.specifications.map((spec, i) => (
                                    <motion.li 
                                        key={i} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 'clamp(0.75rem, 1vw, 1rem)',
                                            fontSize: 'clamp(0.9375rem, 1.1vw + 0.5rem, 1.0625rem)',
                                            color: '#475569',
                                            lineHeight: 1.7,
                                            padding: 'clamp(0.5rem, 0.75vw, 0.75rem)',
                                            borderRadius: '8px',
                                            background: 'rgba(37, 99, 235, 0.03)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(37, 99, 235, 0.03)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <span style={{ 
                                            color: '#2563eb', 
                                            marginTop: '0.25rem',
                                            fontSize: '1.2em',
                                            fontWeight: 'bold'
                                        }}>✓</span>
                                        <span style={{ flex: 1 }}>{spec}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ 
                            marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                            background: '#ffffff',
                            borderRadius: 'clamp(12px, 1.5vw, 16px)',
                            padding: 'clamp(1.25rem, 2vw, 1.75rem)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h2 style={{
                                fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)',
                                fontWeight: 700,
                                color: '#0f172a',
                                marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span style={{ fontSize: '1.5em' }}>⚗️</span>
                                Applications
                            </h2>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'clamp(0.75rem, 1vw, 1rem)'
                            }}>
                                {product.applications.map((app, i) => (
                                    <motion.li 
                                        key={i} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (i + product.specifications.length) * 0.05 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 'clamp(0.75rem, 1vw, 1rem)',
                                            fontSize: 'clamp(0.9375rem, 1.1vw + 0.5rem, 1.0625rem)',
                                            color: '#475569',
                                            lineHeight: 1.7,
                                            padding: 'clamp(0.5rem, 0.75vw, 0.75rem)',
                                            borderRadius: '8px',
                                            background: 'rgba(16, 185, 129, 0.03)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.03)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <span style={{ 
                                            color: '#10b981', 
                                            marginTop: '0.25rem',
                                            fontSize: '1.2em',
                                            fontWeight: 'bold'
                                        }}>•</span>
                                        <span style={{ flex: 1 }}>{app}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1vw, 1rem)' }}>
                            <motion.button
                                onClick={handleAddToInquiry}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: 'clamp(0.875rem, 1.5vw, 1.125rem) clamp(1.5rem, 3vw, 2rem)',
                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: 'clamp(8px, 1vw, 12px)',
                                    fontWeight: 600,
                                    fontSize: 'clamp(0.9375rem, 1.2vw + 0.5rem, 1.125rem)',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span>🛒</span>
                                Add to Inquiry
                            </motion.button>

                            <motion.button
                                onClick={() => {
                                    if (window.addProductToInquiry) {
                                        window.addProductToInquiry({
                                            name: product.name,
                                            desc: product.desc
                                        });
                                    }
                                    setShowInquiry(true);
                                }}
                                whileHover={{ scale: 1.02, borderColor: '#2563eb' }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: 'clamp(0.875rem, 1.5vw, 1.125rem) clamp(1.5rem, 3vw, 2rem)',
                                    background: '#ffffff',
                                    color: '#1a1a1a',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: 'clamp(8px, 1vw, 12px)',
                                    fontWeight: 600,
                                    fontSize: 'clamp(0.9375rem, 1.2vw + 0.5rem, 1.125rem)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}
                            >
                                <span>📧</span>
                                Contact for This Product
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                        marginTop: 'clamp(3rem, 5vw, 5rem)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 30vw, 300px), 1fr))',
                        gap: 'clamp(1.5rem, 2.5vw, 2rem)',
                        marginBottom: 'clamp(3rem, 5vw, 5rem)'
                    }}
                >
                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        padding: 'clamp(1.5rem, 2vw, 2rem)',
                        borderRadius: 'clamp(12px, 1.5vw, 16px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>🚚</div>
                        <h3 style={{ fontSize: 'clamp(1rem, 1.3vw + 0.5rem, 1.25rem)', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                            Fast Shipping
                        </h3>
                        <p style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1rem)', color: '#64748b', margin: 0 }}>
                            Worldwide delivery available
                        </p>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        padding: 'clamp(1.5rem, 2vw, 2rem)',
                        borderRadius: 'clamp(12px, 1.5vw, 16px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>✓</div>
                        <h3 style={{ fontSize: 'clamp(1rem, 1.3vw + 0.5rem, 1.25rem)', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                            Quality Assured
                        </h3>
                        <p style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1rem)', color: '#64748b', margin: 0 }}>
                            ISO certified standards
                        </p>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        padding: 'clamp(1.5rem, 2vw, 2rem)',
                        borderRadius: 'clamp(12px, 1.5vw, 16px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>💬</div>
                        <h3 style={{ fontSize: 'clamp(1rem, 1.3vw + 0.5rem, 1.25rem)', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>
                            24/7 Support
                        </h3>
                        <p style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1rem)', color: '#64748b', margin: 0 }}>
                            Expert assistance available
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Related Products Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{
                    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
                    padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 8rem)',
                    marginTop: 'clamp(2rem, 4vw, 4rem)'
                }}
            >
                <div style={{ maxWidth: 'clamp(1200px, 90vw, 1400px)', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 3vw + 1rem, 2.5rem)',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: 'clamp(2rem, 3vw, 3rem)',
                        textAlign: 'center'
                    }}>
                        Related Products
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 25vw, 300px), 1fr))',
                        gap: 'clamp(1.5rem, 2.5vw, 2rem)'
                    }}>
                        {productsList.filter(p => p.slug !== slug).slice(0, 4).map((relatedProduct) => (
                            <Link key={relatedProduct.slug} href={`/products/${relatedProduct.slug}`} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    style={{
                                        background: '#ffffff',
                                        borderRadius: 'clamp(12px, 1.5vw, 16px)',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                        border: '1px solid #e2e8f0',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        height: 'clamp(180px, 20vw, 220px)',
                                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                                        overflow: 'hidden'
                                    }}>
                                        <img
                                            src={relatedProduct.img}
                                            alt={relatedProduct.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                    <div style={{ padding: 'clamp(1rem, 1.5vw, 1.5rem)' }}>
                                        <h3 style={{
                                            fontSize: 'clamp(1rem, 1.2vw + 0.5rem, 1.25rem)',
                                            fontWeight: 600,
                                            color: '#0f172a',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {relatedProduct.name}
                                        </h3>
                                        <p style={{
                                            fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1rem)',
                                            color: '#64748b',
                                            margin: 0
                                        }}>
                                            {relatedProduct.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.section>

            <Footer />

            {showInquiry && (
                <ProductInquiry
                    isOpen={showInquiry}
                    onClose={() => setShowInquiry(false)}
                    selectedProducts={[{
                        name: product.name,
                        desc: product.desc
                    }]}
                />
            )}
        </div>
    );
}

