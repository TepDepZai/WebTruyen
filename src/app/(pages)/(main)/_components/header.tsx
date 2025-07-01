import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser, logout } from "@/services/authService";
import { EllipsisVertical, LogOutIcon, ScanFace, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const out = await logout()
            if (out.success) {
                router.push("/login");
            } else {
                alert("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Something went wrong");
        }
    }


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getCurrentUser();
                setIsLoggedIn(res.success);
            } catch (error) {

            }
        };
        checkAuth();
    }, []);

    return (
        <header className="h-12 w-full bg-blue-400 border-b border-gray-400 shadow-md flex items-center justify-between px-4">
            <h1 className="text-white font-bold text-lg">Paper Point</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-black text-white transition-colors duration-200">
                        <EllipsisVertical size={20} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                        <User size={16} /> Profile
                    </DropdownMenuItem>
                    {isLoggedIn ? (
                        <DropdownMenuItem
                            className="gap-2 text-red-600 hover:text-red-700"
                            onClick={handleLogout}
                        >
                            <LogOutIcon /> Logout
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            className="gap-2 text-green-600 hover:text-green-700"
                            onClick={() => router.push("/login")}
                        >
                            <ScanFace /> Login
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;