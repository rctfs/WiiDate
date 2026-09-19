import { useState } from "react";

const journalImage = "/Journal.png";

const JournalChannel = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    const handleMouseEnter = () => {
        const timeoutId = setTimeout(() => {
            setShowTooltip(true);
        }, 250);
        setHoverTimeout(timeoutId);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setShowTooltip(false);
    };

    return (
        <div
            className="relative z-10 transparent-border hover:border-[#00c4ff] rounded-xl transition-border mt-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="bg-orange-200 flex items-center justify-center rounded-lg w-full h-full overflow-hidden channel-height">
                <img
                    src={journalImage}
                    alt="Journal"
                    className="md:w-[6.5vw] w-24 object-contain animate-jitter"
                />
            </div>

            {/* Tooltip */}
            {showTooltip && (
                <div className="font-rodin absolute z-20 left-1/2 transform -translate-x-1/2 mt-2 px-24 py-2 bg-white text-black rounded-full text-xl border-2 border-gray-300 shadow-xl whitespace-nowrap">
                    <p>Date Journal</p>
                </div>
            )}
        </div>
    );
};

export default JournalChannel;
