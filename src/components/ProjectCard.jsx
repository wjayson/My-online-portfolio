import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function MediaCarousel({ media }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = media[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    return (
        <div className="relative w-full h-full">
            {/* Media */}
            <div className="relative w-full h-full rounded-xl overflow-hidden">
                {currentItem.type === "image" ? (
                    <motion.img
                        key={currentItem.src}
                        src={currentItem.src}
                        alt="project media"
                        className="w-full h-full object-cover rounded-xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                    />
                ) : (
                    <motion.video
                        key={currentItem.src}
                        src={currentItem.src}
                        controls
                        className="w-full h-full object-cover rounded-xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
                {/* ...按钮、dots不变 */}
            </div>


            {/* Arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {media.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                            index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

function ProjectCard({ project, isExpanded, onExpand, onClose }) {
    return (
        <>
            {/* 卡片未展开状态 */}
                <motion.div
                    layoutId={`project-${project.id}`}
                    onClick={() => !isExpanded && onExpand(project.id)}
                    className={`bg-white shadow-md rounded-xl cursor-pointer p-4 transition-shadow duration-300
                ${isExpanded ? "invisible" : "visible"}
                hover:shadow-lg`}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                </motion.div>

            {/* 展开内容 */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                        >
                            <motion.div
                                layoutId={`project-${project.id}`}
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl min-h-[80vh] overflow-hidden relative p-6 flex"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <button
                                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                    onClick={onClose}
                                >
                                    <X size={24} />
                                </button>

                                {/* 左侧文字区域 */}
                                <div className="flex-1 pr-6 overflow-y-auto h-full">
                                    <motion.h2
                                        className="text-2xl font-bold font-dmsans mb-4"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {project.title}
                                    </motion.h2>
                                    <motion.p
                                        className="text-gray-700 leading-relaxed font-dmsans"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                    >
                                        {project.description}
                                    </motion.p>
                                </div>

                                {/* 右侧媒体区域 */}
                                <div className="w-1/2 max-h-[75vh] flex items-center justify-center">
                                    <div className="w-full h-[70vh] rounded-xl overflow-hidden">
                                        <MediaCarousel media={project.media} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
        </>
    );
}

export default ProjectCard;
