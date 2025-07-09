// LastUpdated.tsx
import React from "react";
import FlipNumbers from "react-flip-numbers";

const LastUpdated = () => {
    // 你可以手动改日期，也可以自动获取
    const date = "2025-07-09"; // YYYY-MM-DD
    const [year, month, day] = date.split("-");

    return (
        <div className="text-xl font-mono flex items-center gap-2">
            <span>🛠️ Last updated:</span>
            <FlipNumbers
                height={30}
                width={20}
                color="#333"
                background="indigo-100"
                play
                numbers={year}
            />
            <span>-</span>
            <FlipNumbers
                height={30}
                width={20}
                color="#333"
                background="indigo-100"
                play
                numbers={month}
            />
            <span>-</span>
            <FlipNumbers
                height={30}
                width={20}
                color="#333"
                background="indigo-100"
                play
                numbers={day}
            />
        </div>
    );
};

export default LastUpdated;
