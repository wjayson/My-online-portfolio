import React, { useEffect, useState, useRef } from "react";
import { Home, User, Folder, Mail } from "lucide-react";
import { motion } from "framer-motion";
import HamburgerMenu from "react-hamburger-menu";

export default function Navbar({ sections, currentSection, onClickSection }) {
    const containerRef = useRef(null);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const burgerButtonRef = useRef(null);

    // 桌面端色带逻辑（保持不变）
    useEffect(() => {
        if (!containerRef.current || window.innerWidth < 768) return;

        const buttons = containerRef.current.querySelectorAll(".nav-button");
        if (buttons.length === 0) return;

        const activeIndex = sections.findIndex((s) => s.id === currentSection);
        if (activeIndex === -1 || activeIndex >= buttons.length) return;

        const activeButton = buttons[activeIndex];
        if (!activeButton) return;

        requestAnimationFrame(() => {
            setUnderlineStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            });
        });
    }, [currentSection, sections, window.innerWidth]);

    // 点击背景关闭菜单
    const handleOutsideClick = (e) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target) &&
            !burgerButtonRef.current.contains(e.target)
        ) {
            setMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            document.addEventListener("click", handleOutsideClick);
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener("click", handleOutsideClick);
            document.body.style.overflow = "";
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const iconMap = {
        welcome: <Home size={18} />,
        about: <User size={18} />,
        projects: <Folder size={18} />,
        resume: <Mail size={18} />,
    };

    // 汉堡菜单动画变体
    const burgerMenuVariants = {
        open: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }
    };

    return (
        <>
            {/* 导航栏 */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-indigo-200 shadow-md flex justify-between items-center px-4 sm:px-6 z-50 w-full">
                <div className="font-bold font-spaceGrotesk text-xl sm:text-2xl cursor-default select-none relative z-10">
                    Jayson WANG
                </div>

                {/* 桌面端导航（保持不变） */}
                <div
                    ref={containerRef}
                    className="hidden md:flex relative w-[600px] rounded-lg overflow-hidden border border-gray-300 font-dmSans"
                >
                    {sections.map(({ id, label }) => {
                        const isActive = currentSection === id;
                        return (
                            <button
                                key={id}
                                className={`nav-button flex-1 py-3 px-2 text-center text-sm sm:text-base font-medium flex items-center justify-center gap-2
                                    transition-colors duration-300 ease-in-out
                                    ${isActive ? "text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-300 hover:text-indigo-700"}`}
                                onClick={() => onClickSection(id)}
                                type="button"
                            >
                                <span className="flex items-center">
                                    {React.cloneElement(iconMap[id], {
                                        className: isActive ? "text-indigo-600" : "text-gray-700",
                                        strokeWidth: 1.5,
                                    })}
                                </span>
                                <span>{label}</span>
                            </button>
                        );
                    })}
                    <span
                        className="absolute bottom-0 h-1 bg-indigo-600 rounded-t transition-all duration-300 ease-in-out z-10"
                        style={{ left: underlineStyle.left, width: underlineStyle.width }}
                    />
                </div>

                {/* 移动端汉堡按钮 */}
                <button
                    ref={burgerButtonRef}
                    className="md:hidden p-2 rounded-md hover:bg-indigo-300 relative z-10 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    style={{ WebkitTapHighlightColor: "transparent" }} // 关键：移除移动端点击高亮
                >
                    <HamburgerMenu
                        isOpen={mobileMenuOpen}
                        menuClicked={() => setMobileMenuOpen(!mobileMenuOpen)}
                        width={24}
                        height={20}
                        strokeWidth={2}
                        rotate={0}
                        color="#4B5563"
                        borderRadius={0}
                        animationDuration={0.4}
                    />
                </button>
            </nav>

            {/* 移动端背景模糊层 */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
                    style={{ top: "4rem" }}
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* 移动端导航菜单 - 核心修复区 */}
            <motion.div
                ref={menuRef}
                variants={burgerMenuVariants}
                animate={mobileMenuOpen ? "open" : "closed"}
                className="fixed top-16 left-0 right-0 bg-indigo-200 border-t border-gray-300 md:hidden z-50 w-full overflow-hidden"
            >
                <div className="flex flex-col p-0 m-0">
                    {sections.map(({ id, label }) => {
                        const isActive = currentSection === id;
                        return (
                            <motion.button
                                key={id}
                                whileHover={{ bgColor: isActive ? "indigo-300" : "gray-300" }} // 只保留悬停效果
                                className={`py-4 px-6 text-left flex items-center gap-3 transition-colors duration-300
                                    ${isActive ? "bg-indigo-300 text-indigo-600 font-semibold" : "text-gray-700"}`}
                                onClick={() => onClickSection(id)}
                                type="button"
                                // 关键：移除所有点击状态样式
                                style={{
                                    WebkitTapHighlightColor: "transparent", // 禁用系统点击高亮
                                    userSelect: "none" // 防止文本选中
                                }}
                                onMouseDown={(e) => e.preventDefault()} // 阻止默认按下状态
                                onFocus={(e) => e.target.blur()} // 移除焦点状态
                            >
                                {React.cloneElement(iconMap[id], { strokeWidth: 1.5 })}
                                <span>{label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>
        </>
    );
}