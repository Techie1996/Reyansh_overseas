"use client";
import { motion } from 'framer-motion';

export default function VisionMission() {
    return (
        <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, padding: '5vw 0', background: '#fff', position: 'relative' }}>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{ 
                    flex: 1, 
                    minWidth: 280, 
                    maxWidth: 500, 
                    textAlign: 'center',
                    padding: 32,
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                    borderRadius: 20,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(66, 133, 244, 0.1)'
                }}
            >
                <motion.h3 
                    style={{ color: '#4285f4', fontWeight: 'bold', fontSize: '1.7rem', marginBottom: 12 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    OUR VISION
                </motion.h3>
                <p style={{ fontSize: 18, lineHeight: 1.6, color: '#333' }}>
                    To be a globally recognized leader in the manufacturing and supply of high-quality laboratory glassware, fostering innovation and excellence to support the scientific, pharmaceutical, and industrial sectors in their pursuit of progress.
                </p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{ 
                    flex: 1, 
                    minWidth: 280, 
                    maxWidth: 500, 
                    textAlign: 'center',
                    padding: 32,
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                    borderRadius: 20,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(66, 133, 244, 0.1)'
                }}
            >
                <motion.h3 
                    style={{ color: '#4285f4', fontWeight: 'bold', fontSize: '1.7rem', marginBottom: 12 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    OUR MISSION
                </motion.h3>
                <p style={{ fontSize: 18, lineHeight: 1.6, color: '#333' }}>
                    To deliver premium-quality laboratory glassware that meets international standards, ensuring precision and reliability in scientific research and industrial applications. To build lasting partnerships with clients by offering exceptional customer service, competitive pricing, and on-time delivery.
                </p>
            </motion.div>
        </section>
    );
} 