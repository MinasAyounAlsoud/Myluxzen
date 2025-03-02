import React from "react";

export const ProcessBar = ({ step, setStep }) => {
    // 定义步骤名称
    const steps = ["Dates", "Houses", "Contact", "Payment"];

    return (
        <div  className="py-10 px-12" >
            <div className="flex items-center space-x-4">
                {steps.map((label, index) => {
                    const isActive = step >= index + 1;

                    return (
                        <React.Fragment key={index}>
                            {/* 步骤按钮 */}
                            <button
                                className={`text-base font-medium ${isActive ? "text-gray-600 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                                onClick={() => isActive && setStep(index + 1)}
                                disabled={!isActive}
                            >
                                {label}
                            </button>

                            {/* 只在不是最后一步时显示箭头 */}
                            {index < steps.length - 1 && (
                                <span className="text-base text-gray-400"> &gt; </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
