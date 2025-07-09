import React, { useEffect, useState, useRef } from "react";
import { Home, User, Folder, Mail } from "lucide-react";

export default function Navbar({ sections, currentSection, onClickSection }) {
    const containerRef = useRef(null);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const buttons = containerRef.current.querySelectorAll(".nav-button");
        const activeIndex = sections.findIndex((s) => s.id === currentSection);

        if (activeIndex === -1) return;
        const btn = buttons[activeIndex];
        if (!btn) return;

        setUnderlineStyle({
            left: btn.offsetLeft,
            width: btn.offsetWidth,
        });
    }, [currentSection, sections]);

    const iconMap = {
        welcome: <Home size={18} />,
        about: <User size={18} />,
        projects: <Folder size={18} />,
        resume: <Mail size={18} />,
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-indigo-200 shadow-md flex justify-between items-center px-6 z-50 w-full mx-auto">
            <div className="font-bold font-spaceGrotesk text-2xl cursor-default select-none">Jayson WANG</div>
            <div
                ref={containerRef}
                className="relative flex w-[600px] rounded-lg overflow-hidden border border-gray-300 font-dmSans"
            >
                {sections.map(({ id, label }) => {
                    const isActive = currentSection === id;
                    return (
                        <button
                            key={id}
                            className={`nav-button flex-1 py-3 px-2 text-center text-base font-medium flex items-center justify-center gap-2
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
                    className="absolute bottom-0 h-1 bg-indigo-600 rounded-t transition-all duration-300 ease-in-out"
                    style={{
                        left: underlineStyle.left,
                        width: underlineStyle.width,
                    }}
                />
            </div>
        </nav>
    );
}
