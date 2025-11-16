"use client";
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ end, suffix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let startTime = null;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

function StatCard({ value, label, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.1, y: -5 }}
            style={{ textAlign: 'center', cursor: 'pointer' }}
        >
            <motion.div
                style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#4285f4',
                    background: '#e3f0ff',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
            >
                {value}
            </motion.div>
            <div style={{ marginTop: 12, fontSize: 16, fontWeight: 500 }}>{label}</div>
        </motion.div>
    );
}

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <>
            <section ref={sectionRef} id="about" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '5vw 0', background: '#fafbff' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                    style={{ flex: 1, minWidth: 280, maxWidth: 500 }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 16 }}
                    >
                        What We Do
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontSize: 18, lineHeight: 1.6 }}
                    >
                        Krishnawanshi Overseas is a trusted manufacturer and exporter specializing in a wide range of high-quality laboratory glassware. With years of expertise in crafting precision glassware, we are dedicated to providing reliable and durable products for scientific research, educational purposes, and industrial applications. Our commitment to excellence and innovation has earned us a reputation as one of the top suppliers in the industry.
                    </motion.p>
                    <div style={{ display: 'flex', gap: 24, marginTop: 32, justifyContent: 'center' }}>
                        <StatCard value={<><AnimatedCounter end={12} />+</>} label="Years Of Establishment" delay={0.3} />
                        <StatCard value={<><AnimatedCounter end={500} />+</>} label="Clients" delay={0.4} />
                        <StatCard value={<AnimatedCounter end={40} />} label="No of Employees" delay={0.5} />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ flex: 1, minWidth: 280, maxWidth: 400, textAlign: 'center' }}
                >
                    <motion.img
                        src="/laboratory-supplies-medical-work.jpg"
                        alt="Scientific Glassware"
                        width={350}
                        height={250}
                        style={{ borderRadius: 12, objectFit: 'cover', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </section>
            {/* Company Goel Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '2vw 0 5vw 0', background: '#fff' }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ flex: 1, minWidth: 280, maxWidth: 500, textAlign: 'center' }}
                >
                    <motion.img
                        src="/48448.jpg"
                        alt="Colorful Glassware"
                        width={420}
                        height={180}
                        style={{ borderRadius: 8, objectFit: 'contain', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        whileHover={{ scale: 1.05, rotate: -1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ flex: 1, minWidth: 280, maxWidth: 600, textAlign: 'left', padding: '0 2vw' }}
                >
                    <motion.h2
                        style={{ color: '#2979ff', fontWeight: 800, fontSize: '2rem', marginBottom: 16, letterSpacing: 1 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        COMPANY GOEL
                    </motion.h2>
                    <motion.ul
                        style={{ fontSize: 22, color: '#222', lineHeight: 1.7, listStyle: 'disc inside', margin: 0, padding: 0 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {['Affordable Quality', 'Diverse Product Range', 'Serving Industrial, Pharmaceutical, School and University Industries', 'Class A and B Product Classification'].map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                style={{ marginBottom: 8 }}
                            >
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
                <style>{`
          @media (max-width: 900px) {
            section[style*='Company Goel'] {
              flex-direction: column !important;
              text-align: center !important;
            }
            section[style*='Company Goel'] > div {
              max-width: 100% !important;
              padding: 0 !important;
            }
            section[style*='Company Goel'] ul {
              text-align: left !important;
              margin: 0 auto !important;
              max-width: 90vw !important;
            }
          }
        `}</style>
            </motion.section>
        </>
    );
} 