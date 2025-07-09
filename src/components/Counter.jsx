import React, { useState, useEffect } from "react";
import FlipNumbers from "react-flip-numbers";
import { useInView } from "react-intersection-observer";

const LastUpdated = () => {
    const date = "2025-07-09";
    const [year, month, day] = date.split("-");
    const [playStates, setPlayStates] = useState([]);
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

    // 将完整字符串打散为单个字符数组
    const digits = [...year, "-", ...month, "-", ...day];

    useEffect(() => {
        if (inView) {
            // 初始化每一位为 false（不播放）
            setPlayStates(Array(digits.length).fill(false));

            // 设置每一位的延迟播放
            digits.forEach((_, idx) => {
                setTimeout(() => {
                    setPlayStates(prev => {
                        const updated = [...prev];
                        updated[idx] = true;
                        return updated;
                    });
                }, idx * 50); // 每位延迟 300ms
            });
        }
    }, [inView]);

    return (
        <div
            ref={ref}
            className="text-xl font-mono flex items-center gap-1"
        >
            <span>🛠️ Last updated:</span>
            {digits.map((digit, idx) =>
                digit === "-" ? (
                    <span key={idx}>-</span>
                ) : (
                    <FlipNumbers
                        key={idx}
                        height={30}
                        width={20}
                        color="#333"
                        background="indigo-100"
                        play={playStates[idx]}
                        numbers={digit}
                        duration={1.5}
                    />
                )
            )}
        </div>
    );
};

export default LastUpdated;
