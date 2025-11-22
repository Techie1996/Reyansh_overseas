"use client";
import { motion } from 'framer-motion';

export default function VisionMission() {
    return (
        <section style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: 'clamp(2rem, 4vw, 4rem)', 
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 8rem)', 
            background: '#fff', 
            position: 'relative',
            maxWidth: 'clamp(1200px, 90vw, 1600px)',
            margin: '0 auto'
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{ 
                    flex: 1, 
                    minWidth: 'clamp(280px, 40vw, 400px)', 
                    maxWidth: 'clamp(500px, 50vw, 700px)', 
                    textAlign: 'center',
                    padding: 'clamp(2rem, 3vw, 3rem)',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                    borderRadius: 20,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(66, 133, 244, 0.1)'
                }}
            >
                <motion.h3 
                    style={{ 
                        color: '#4285f4', 
                        fontWeight: 'bold', 
                        fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 2.25rem)', 
                        marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' 
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    OUR VISION
                </motion.h3>
                <p style={{ 
                    fontSize: 'clamp(1rem, 1.2vw + 0.5rem, 1.375rem)', 
                    lineHeight: 1.6, 
                    color: '#333' 
                }}>
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
                    minWidth: 'clamp(280px, 40vw, 400px)', 
                    maxWidth: 'clamp(500px, 50vw, 700px)', 
                    textAlign: 'center',
                    padding: 'clamp(2rem, 3vw, 3rem)',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                    borderRadius: 20,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(66, 133, 244, 0.1)'
                }}
            >
                <motion.h3 
                    style={{ 
                        color: '#4285f4', 
                        fontWeight: 'bold', 
                        fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 2.25rem)', 
                        marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' 
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    OUR MISSION
                </motion.h3>
                <p style={{ 
                    fontSize: 'clamp(1rem, 1.2vw + 0.5rem, 1.375rem)', 
                    lineHeight: 1.6, 
                    color: '#333' 
                }}>
                    To deliver premium-quality laboratory glassware that meets international standards, ensuring precision and reliability in scientific research and industrial applications. To build lasting partnerships with clients by offering exceptional customer service, competitive pricing, and on-time delivery.
                </p>
            </motion.div>
        </section>
    );
} 