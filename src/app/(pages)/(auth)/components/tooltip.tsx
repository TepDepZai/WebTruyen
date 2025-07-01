import { ShieldAlert } from "lucide-react";

type ToolTipProps = {
    changed?: boolean;
};

const ToolTip = ({ changed }: ToolTipProps) => {
    return (
        <div className="flex justify-end relative">
            <div className="group">
                <ShieldAlert className={`cursor-pointer ${changed ? "text-red-500" : ""}`} />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white text-sm text-gray-700 border border-gray-300 rounded-lg shadow-md p-3 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <p><strong>Security Tip:</strong></p>
                    <p>- Your password must be at least 8 characters long.</p>
                    <p>- Use a mix of letters, numbers, and symbols.</p>
                </div>
            </div>
        </div>
    );
};

export default ToolTip;
