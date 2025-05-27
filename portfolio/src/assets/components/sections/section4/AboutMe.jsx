import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFileDownload } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';

// Import tsparticles v3+ specific modules
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const AboutSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [particlesInitReady, setParticlesInitReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); 
        }).then(() => {
            setParticlesInitReady(true);
        });
    }, []);

    const [profileImageLoaded, setProfileImageLoaded] = useState(false);

    // Animation variants for staggered reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger children by 0.1 seconds
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
    };

    
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.2 } }
    };

    return (
        <section 
            id="about"
            name="about"
            variants={containerVariants}
            ref={ref}
            className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-start py-10 lg:py-24"
        >
            {/* Animated Particles Background */}
            {particlesInitReady && (
                <div className="absolute inset-0 z-0">
                    <Particles
                        id="tsparticles"
                        options={{
                            fullScreen: { enable: false },
                            background: {
                                color: { value: "transparent" }
                            },
                            particles: {
                                number: { value: 60, density: { enable: true, area: 800 } },
                                color: { value: "#8854D9" },
                                shape: {
                                    type: "circle",
                                },
                                opacity: {
                                    value: 0.7,
                                    random: false,
                                    anim: { enable: false }
                                },
                                size: {
                                    value: { min: 1, max: 4 },
                                    random: true,
                                    anim: { enable: false }
                                },
                                links: {
                                    enable: true,
                                    distance: 120,
                                    color: "#6C5CE7",
                                    opacity: 0.6,
                                    width: 1,
                                },
                                move: {
                                    enable: true,
                                    speed: 1.5,
                                    direction: "none",
                                    random: true,
                                    straight: false,
                                    outModes: {
                                        default: "bounce",
                                    },
                                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                                }
                            },
                            interactivity: {
                                events: {
                                    onHover: {
                                        enable: true,
                                        mode: "repulse",
                                    },
                                    onClick: {
                                        enable: true,
                                        mode: "push",
                                    },
                                    resize: true,
                                },
                                modes: {
                                    repulse: {
                                        distance: 100,
                                        duration: 0.4,
                                    },
                                    push: {
                                        quantity: 4,
                                    }
                                }
                            },
                            detectRetina: true,
                        }}
                    />
                </div>
            )}

            {/* Parallax Background Elements */}
            <motion.div 
                className="absolute inset-0 z-10 bg-[url('')] bg-repeat opacity-20"
                style={{ y: yBg, opacity }}
            />

            {/* Main Page Title for About Me */}
            <motion.h2 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 text-3xl lg:text-5xl font-extrabold text-white text-center mb-10 px-4"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    About Me
                </span>
            </motion.h2>

            {/* Content Container - Adjusted to sit below the title */}
            <motion.div 
                className="relative z-20 flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto px-8 lg:px-16 gap-12 text-center lg:text-left"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.2 }} 
            >
                {/* Left Column - Avatar & Socials */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center lg:items-start"
                >
                    <div className="relative group mb-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-slow"></div>
                        <img 
                            src="/boutme.png"
                            alt="Pravesh's Profile"
                            className={`relative w-48 h-48 lg:w-64 lg:h-64 rounded-full border-4 border-gray-700 object-contain shadow-2xl transition-opacity duration-500 ${profileImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setProfileImageLoaded(true)}
                        />
                    </div>

                    <div className="flex gap-4 mb-8">
                        <motion.a 
                            whileHover={{ y: -6, color: '#6C5CE7' }}
                            href="https://github.com/praveshyadav753" 
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <FaGithub size={28} />
                        </motion.a>
                        <motion.a 
                            whileHover={{ y: -6, color: '#0077B5' }}
                            href="www.linkedin.com/in/pravesh-yadav-a36b111a1" 
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <FaLinkedin size={28} />
                        </motion.a>
                        <motion.a 
                            whileHover={{ y: -6, color: '#1DA1F2' }}
                            href="https://x.com/Pravesh_753?t=RYD9MPA9gpGd7T_e0SlYxg&s=09" 
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <FaTwitter size={28} />
                        </motion.a>
                        <motion.a 
                            whileHover={{ y: -6, color: '#4CAF50' }}
                            href="https://leetcode.com/u/py383372/" 
                            target="_blank" rel="noopener noreferrer"
                            className="text-gray-400 transition-colors"
                        >
                            <SiLeetcode size={28} />
                        </motion.a>
                    </div>

                    <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(108, 92, 231, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        href="/resume.pdf"
                        download
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center gap-3 text-white font-semibold text-lg shadow-xl transition-all duration-300"
                    >
                        <FaFileDownload size={20} /> Download Resume
                    </motion.a>
                </motion.div>

                {/* Right Column - Text Content */}
                <motion.div 
                    variants={containerVariants} // Apply container variants to this right column as well
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.2 }} 
                    className="max-w-3xl lg:ml-auto"
                >
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl lg:text-5xl font-extrabold text-white mb-2 leading-tight"
                    >
                        Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Pravesh</span>
                    </motion.h1>
                    
                    <motion.div 
                        variants={itemVariants}
                        className="text-2xl lg:text-3xl font-light text-gray-300 mb-3 h-12 lg:h-16 flex items-center justify-center lg:justify-start"
                    >
                        <TypeAnimation
                            sequence={[
                                'a Software Engineer.',
                                1500,
                                'a Full Stack Developer.',
                                1500,
                                'a Python Developer.',
                                1500,
                                'a Tech Enthusiast.',
                                1500
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-blue-300"
                        />
                    </motion.div>

                    <motion.p 
                        variants={itemVariants}
                        className="text-lg lg:text-md text-gray-300 mb-8 leading-relaxed"
                    >
                        I'm a passionate engineer with **years of experience** in building scalable web applications. My expertise lies in modern web technologies like **React**, **Node.js**, **Python**, and Databases. 
                        I'm deeply committed to writing clean, efficient, and maintainable code, 
                        and I thrive on solving complex technical challenges to deliver impactful user experiences.
                    </motion.p>

                    <div className="mb-8 text-left">
                        <motion.h2 
                            variants={itemVariants}
                            className="text-3xl font-bold text-white mb-6"
                        >
                            Education
                        </motion.h2>
                        <motion.div 
                            variants={containerVariants} // Stagger education items
                            initial="hidden"
                            whileInView="show"
                            viewport={{ amount: 0.2 }} 
                            className="relative"
                        >
                            <div className="absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                            
                            <div className="ml-8 space-y-6">
                                <motion.div 
                                    variants={itemVariants} // Apply to individual education item
                                    className="relative group p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                                >
                                    <div className="absolute -left-10 top-4 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">B-tech in Information Technology</h3>
                                    <p className="text-blue-300">Medicaps University • 2021-2025</p>
                                    <p className="text-gray-400 mt-1">Specialization in Data Science and AI</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-left">
                        <motion.h2 
                            variants={itemVariants}
                            className="text-3xl font-bold text-white mb-6"
                        >
                            Technical Skills
                        </motion.h2>
                        <motion.div 
                            variants={containerVariants} // Stagger skills
                            initial="hidden"
                            whileInView="show"
                            viewport={{ amount: 0.2 }} 
                            className="flex flex-wrap gap-4"
                        >
                            {['React', 'Node.js', 'JavaScript', 'Kubernetes', 
                                'Python', 'Django', 'MongoDB', 'Figma', 'Video Editing'].map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    variants={itemVariants} // Apply to individual skill tags
                                    whileHover={{ scale: 1.05, backgroundColor: '#6C5CE7' }}
                                    className="px-5 py-2 bg-gray-700 rounded-full text-white text-base font-medium shadow-md cursor-pointer transform transition-all duration-200"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-30"
            >
                <span className="mb-2 text-sm text-gray-400">Scroll Down</span>
                <div className="w-7 h-11 border-2 border-white rounded-full flex justify-center p-0.5">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default AboutSection;