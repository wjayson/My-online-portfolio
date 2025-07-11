import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import Counter from "./components/Counter";
import projects from "./data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Folder, FileText } from "lucide-react";

export default function App() {
    const [expandedProject, setExpandedProject] = useState(null);
    const [currentSection, setCurrentSection] = useState("welcome");

    const welcomeRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const resumeRef = useRef(null);

    const sections = [
        { id: "welcome", label: "Welcome", icon: <Home size={20} />, ref: welcomeRef },
        { id: "about", label: "About", icon: <User size={20} />, ref: aboutRef },
        { id: "projects", label: "Projects", icon: <Folder size={20} />, ref: projectsRef },
        { id: "resume", label: "Contacts", icon: <FileText size={20} />, ref: resumeRef },
    ];

    // 给html标签添加/移除 no-scroll 类，控制滚动锁定
    useEffect(() => {
        const html = document.documentElement;
        if (expandedProject !== null) {
            html.classList.add("no-scroll");
        } else {
            html.classList.remove("no-scroll");
        }
    }, [expandedProject]);

    // 监听滚动切换当前section
    useEffect(() => {
        function onScroll() {
            const scrollY = window.scrollY + window.innerHeight / 3;
            for (let i = sections.length - 1; i >= 0; i--) {
                const sec = sections[i];
                if (sec.ref.current && sec.ref.current.offsetTop <= scrollY) {
                    setCurrentSection(sec.id);
                    break;
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [sections]);

    // 点击导航栏平滑滚动
    function scrollToSection(id) {
        const section = sections.find((s) => s.id === id);
        if (section?.ref.current) {
            section.ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setCurrentSection(id);
    }

    return (
        <>
            <Navbar
                sections={sections}
                currentSection={currentSection}
                onClickSection={scrollToSection}
                onSetCurrentSection={setCurrentSection}
            />

            <main className="font-notoSans text-gray-800 w-full h-full">
                {/* Welcome Section */}
                <section
                    ref={welcomeRef}
                    id="welcome"
                    className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-indigo-100 pt-16 w-full"
                >
                    <h1 className="font-spaceGrotesk text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center">
                        Welcome to My Portfolio
                    </h1>
                    <Counter />
                </section>

                {/* About Section */}
                <section ref={aboutRef} id="about" className="bg-indigo-50 w-full flex justify-center pt-20">
                    <div className="max-w-4xl min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 py-12 px-4 sm:px-6 w-full">
                        <motion.img
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            src="/your-photo.jpg"
                            alt="Your Photo"
                            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
                        />
                        <div className="w-full md:w-auto">
                            <motion.h2
                                initial={{ y: -50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="font-spaceGrotesk text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center md:text-left"
                            >
                                About Me
                            </motion.h2>
                            <motion.p
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-notoSans"
                            >
                                {`Put your bio here.\nTalk about your background, interests, skills.`}
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section
                    ref={projectsRef}
                    id="projects"
                    className="min-h-screen mx-auto bg-indigo-100 py-20 px-4 sm:px-6 w-full"
                >
                    <motion.h2
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-spaceGrotesk text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-center max-w-7xl mx-auto"
                    >
                        Projects
                    </motion.h2>
                    <div className="grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={expandedProject === project.id ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                                transition={{
                                    delay: expandedProject === project.id ? 0 : index * 0.15,
                                    duration: 0.4,
                                    ease: "easeOut",
                                }}
                            >
                                <ProjectCard
                                    project={project}
                                    isExpanded={expandedProject === project.id}
                                    onExpand={setExpandedProject}
                                    onClose={() => setExpandedProject(null)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contacts Section */}
                <section
                    ref={resumeRef}
                    id="resume"
                    className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center relative px-4 sm:px-6 pt-20 w-full"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl">
                        <motion.h2
                            initial={{ y: -50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-spaceGrotesk text-2xl sm:text-3xl md:text-4xl font-semibold w-full md:w-1/3 text-center md:text-left"
                            style={{ lineHeight: 1 }}
                        >
                            My Contacts
                        </motion.h2>

                        <motion.p
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-gray-700 text-base sm:text-lg font-notoSans w-full md:w-1/3 flex items-center justify-center md:justify-end"
                            style={{ lineHeight: 1 }}
                        >
                            <strong className="text-gray-900 mr-2">Email:</strong> Wjayson@outlook.com
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-16 mx-auto w-[224px] flex flex-col items-center"
                    >
                        <img
                            src="/7.jpg"
                            alt="👆 My dog 👆"
                            className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-lg"
                        />
                        <p className="mt-4 text-center text-gray-700 font-notoSans text-sm sm:text-base">
                            👆 My dog 👆
                        </p>
                    </motion.div>
                </section>
            </main>

            {/* 遮罩层 */}
            <AnimatePresence>
                {expandedProject && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
                        onClick={() => setExpandedProject(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
