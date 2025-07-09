import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import Counter from "./components/Counter";
import projects from "./data/projects";
import { motion } from "framer-motion";
import { Home, User, Folder, FileText } from "lucide-react";

export default function App() {
    const [expandedProject, setExpandedProject] = useState(null);
    const [currentSection, setCurrentSection] = useState("welcome");

    const welcomeRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const resumeRef = useRef(null);

    // 禁止滚动 useEffect
    useEffect(() => {
        if (expandedProject !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [expandedProject]);

    // 监听滚动切换当前section
    useEffect(() => {
        function onScroll() {
            const sections = [
                { id: "welcome", label: "Welcome", icon: <Home size={20} /> },
                { id: "about", label: "About", icon: <User size={20} /> },
                { id: "projects", label: "Projects", icon: <Folder size={20} /> },
                { id: "resume", label: "Resume", icon: <FileText size={20} /> },
            ];

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
    }, []);

    function scrollToSection(ref) {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }


    return (
        <>
            <Navbar
                sections={[
                    { id: "welcome", label: "Welcome", ref: welcomeRef },
                    { id: "about", label: "About", ref: aboutRef },
                    { id: "projects", label: "Projects", ref: projectsRef },
                    { id: "resume", label: "Resume", ref: resumeRef },
                ]}
                currentSection={currentSection}
                onClickSection={scrollToSection}
                onSetCurrentSection={setCurrentSection}
            />

            <main className="font-notoSans text-gray-800 w-full h-full ">
                {/* Welcome Section */}
                <section
                    ref={welcomeRef}
                    id="welcome"
                    className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-indigo-100 "
                >
                    <h1 className="font-spaceGrotesk text-6xl font-bold mb-6 text-center">
                        Welcome to My Portfolio
                    </h1>
                    <Counter/>
                </section>

                {/* About Section */}
                <section
                    ref={aboutRef}
                    id="about"
                    className="bg-indigo-50 w-full flex justify-center"
                >
                    <div className="max-w-4xl min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 py-16 px-4 sm:px-6">
                        <motion.img
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            src="/your-photo.jpg"
                            alt="Your Photo"
                            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
                        />
                        <div>
                            <motion.h2
                                initial={{ y: -50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="font-spaceGrotesk text-3xl sm:text-4xl font-semibold mb-4"
                            >
                                About Me
                            </motion.h2>
                            <motion.p
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line font-notoSans"
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
                    className="min-h-screen mx-auto bg-indigo-100 py-32 px-4 sm:px-6"
                >
                    <motion.h2
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-spaceGrotesk text-3xl sm:text-4xl font-semibold mb-8 text-center max-w-7xl mx-auto"
                    >

                        Projects
                    </motion.h2>
                    <div className="grid max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto md:gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={expandedProject === project.id ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                                transition={{
                                    delay: expandedProject === project.id ? 0 : index * 0.15,
                                    duration: 0.6,
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


                {/* Resume Section */}
                <section
                    ref={resumeRef}
                    id="resume"
                    className="min-h-screen py-32 px-4 sm:px-6 mx-auto bg-indigo-50 flex justify-center gap-8"
                >
                    {/* 左侧区域，高度与右侧PDF一致 */}
                    <div className="flex flex-col justify-center items-center w-1/3" style={{ height: "600px" }}>
                        <motion.h2
                            initial={{ y: -50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}

                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-spaceGrotesk text-3xl sm:text-4xl font-semibold mb-4"
                        >
                            My resume
                        </motion.h2>
                        <motion.a
                            href="/your-resume.pdf"
                            download="My_Resume.pdf"
                            className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition font-dmSans"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            Download CV
                        </motion.a>


                    </div>

                    {/* 右侧 PDF */}
                    <div className="2-595px shadow-lg rounded overflow-hidden" style={{ height: "600px" }}>
                        <iframe
                            src="/your-resume.pdf"
                            title="Resume PDF"
                            className="h-full"
                            style={{
                                width: "595px",         // A4宽度，单位是像素（适合72dpi）
                                border: "none",
                                margin: "0 auto",       // 如果你希望居中展示
                                display: "block",       // 配合居中
                            }}
                        />
                    </div>
                </section>


            </main>

            {/* Overlay for expanded project */}
            {expandedProject && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
                    onClick={() => setExpandedProject(null)}
                />
            )}
        </>
    );


}
