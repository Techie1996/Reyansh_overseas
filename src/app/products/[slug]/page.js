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
import { allProducts as productsList } from '../../data/products';

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

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff' }}>
            <BackgroundMusic />
            <Notification />
            <InquiryCart />
            <HeroHeader />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 5vw' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <Link
                        href="/products"
                        style={{
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        ← Back to Products
                    </Link>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            background: '#f8fafc',
                            borderRadius: '16px',
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: '1',
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={product.img}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em'
                        }}>
                            {product.name}
                        </h1>
                        <p style={{
                            fontSize: '1.125rem',
                            color: '#64748b',
                            marginBottom: '2rem'
                        }}>
                            {product.desc}
                        </p>

                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: '#0f172a',
                                marginBottom: '1rem'
                            }}>
                                Specifications
                            </h2>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                {product.specifications.map((spec, i) => (
                                    <li key={i} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem',
                                        fontSize: '0.9375rem',
                                        color: '#475569',
                                        lineHeight: 1.6
                                    }}>
                                        <span style={{ color: '#2563eb', marginTop: '0.25rem' }}>✓</span>
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: '#0f172a',
                                marginBottom: '1rem'
                            }}>
                                Applications
                            </h2>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                {product.applications.map((app, i) => (
                                    <li key={i} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem',
                                        fontSize: '0.9375rem',
                                        color: '#475569',
                                        lineHeight: 1.6
                                    }}>
                                        <span style={{ color: '#2563eb', marginTop: '0.25rem' }}>•</span>
                                        {app}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <motion.button
                            onClick={handleAddToInquiry}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '1rem 2rem',
                                background: '#1a1a1a',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                marginBottom: '1rem'
                            }}
                        >
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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '1rem 2rem',
                                background: 'transparent',
                                color: '#1a1a1a',
                                border: '1.5px solid #e2e8f0',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Contact for This Product
                        </motion.button>
                    </motion.div>
                </div>
            </div>

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

