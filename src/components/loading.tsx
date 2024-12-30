import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-[150px]">
            <div className="flex justify-center items-center space-x-2">
                <div className="w-12 h-12 border-4 border-t-4 border-gray-400 rounded-full animate-spin"></div>
                <span className="text-gray-600 text-xl">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
