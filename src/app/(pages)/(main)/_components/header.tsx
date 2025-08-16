"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser, logout } from "@/services/authService";
import {
    ChevronRight,
    EllipsisVertical,
    LogOutIcon,
    ScanFace,
    Search,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const out = await logout();
            if (out.success) {
                setIsLoggedIn(false);
                router.push("/login");
            } else {
                alert("Logout failed");
            }
        } catch (error: any) {
            console.error("Logout error:", error);
        }
    };
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getCurrentUser();
                setIsLoggedIn(res.success);
            } catch (error: any) {
            }
        };
        checkAuth();
    }, []);

    return (
        <header className="h-16 w-full bg-gradient-to-r from-[#52357B] to-[#3B5C7E] border-b border-gray-400 shadow-lg flex items-center justify-between px-6 gap-4">
            {/* Logo */}
            <h1
            onClick={() => router.push("/")}
            className="text-white font-extrabold text-2xl tracking-wide font-mono drop-shadow-lg select-none">
                Paper Point
            </h1>

            {/* Top + Genres dropdown */}
            <div className="flex items-center gap-4">
                {/* Top Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-lg hover:bg-white/10 text-white transition flex items-center gap-1 font-semibold">
                            Top <ChevronRight size={18} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-44">
                        <DropdownMenuLabel>Top</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Top week</DropdownMenuItem>
                        <DropdownMenuItem>Top month</DropdownMenuItem>
                        <DropdownMenuItem>Top day</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Genres Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-lg hover:bg-white/10 text-white transition flex items-center gap-1 font-semibold">
                            Genres <ChevronRight size={18} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-44">
                        <DropdownMenuLabel>Genres</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Manga</DropdownMenuItem>
                        <DropdownMenuItem>Manhua</DropdownMenuItem>
                        <DropdownMenuItem>Manhwa</DropdownMenuItem>
                        <DropdownMenuItem>Cổ tích</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center flex-grow max-w-lg mx-6 rounded-2xl bg-white/90 shadow-inner overflow-hidden border border-gray-200">
                <input
                    type="search"
                    placeholder="Search..."
                    className="flex-grow px-4 py-2 focus:outline-none text-black bg-transparent placeholder-gray-500"
                />
                <button
                    className="px-4 py-3 hover:bg-blue-200 transition"
                    aria-label="Search"
                    title="Search"
                >
                    <Search size={20} className="" />
                </button>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="p-2 rounded-full hover:bg-white/10 text-white transition flex items-center"
                        title="Account menu"
                        aria-label="Account menu"
                    >
                        <EllipsisVertical size={22} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2"
                        onClick={() => router.push("/profile")}
                    >
                        <User size={16} /> Profile
                    </DropdownMenuItem>
                    {isLoggedIn ? (
                        <DropdownMenuItem
                            className="gap-2 text-red-600 hover:text-red-700"
                            onClick={handleLogout}
                        >
                            <LogOutIcon size={16} /> Logout
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            className="gap-2 text-green-600 hover:text-green-700"
                            onClick={() => router.push("/login")}
                        >
                            <ScanFace size={16} /> Login
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;