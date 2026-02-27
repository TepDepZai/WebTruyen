"use client";

import { AdminIcon, UpArrowIcon } from "@/components/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/authProvider";
import { logout } from "@/services/authService";
import {
  LogOutIcon,
  ScanFace,
  Search,
  User,
  UserPlus,
  BookPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "Admin";
  const isAuthor = user?.role === "Author";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = async () => {
    try {
      const out = await logout();
      if (out.success) {
        setUser(null);
        router.push("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="h-16 w-full bg-gradient-to-r from-[#0B0B0E] via-[#14141A] to-[#1B1B23] rounded-b-sm border-b border-[#F5C452]/40 shadow-[0_8px_30px_rgba(0,0,0,0.45)] flex items-center justify-between px-6 gap-4">
      <h1
        onClick={() => router.push("/")}
        className={`text-white font-extrabold text-2xl tracking-wide drop-shadow-lg select-none cursor-pointer `}
      >
        Paper Point
      </h1>
      <div className="flex items-center gap-2">
        <div
          className={`relative overflow-hidden transition-all duration-300 ease-out ${showSearch ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
        >
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full bg-white/90 py-2 pl-9 pr-3 text-sm text-black shadow-[0_8px_24px_rgba(0,0,0,0.15)] outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-white/40"
          />
        </div>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 rounded-full hover:bg-white/10 text-white transition"
          aria-expanded={showSearch}
          aria-label="Toggle search"
        >
          <Search size={16} />
        </button>
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className={`p-2 rounded-full hover:bg-white/10 text-white transition flex items-center font-medium`}
            >
              {user?.fullName ? user.fullName : "Account"}
              <UpArrowIcon
                className={`!w-5 !h-5 ml-1 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>
              {isLoggedIn ? `Hi, ${user?.fullName}` : "Guest"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Author Menu */}
            {isAuthor && (
              <>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/author/books")}
                >
                  <BookPlus size={16} /> My Books
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            {/* Admin Menu */}
            {isAdmin && (
              <>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/admin/user")}
                >
                  <AdminIcon /> Admin Panel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            {/* Common Menu for Logged-in Users */}
            {isLoggedIn ? (
              <div>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/profile")}
                >
                  <User size={16} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  className="gap-2"
                  onClick={handleLogout}
                >
                  <LogOutIcon size={16} /> Logout
                </DropdownMenuItem>
              </div>
            ) : (
              <div>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/login")}
                >
                  <ScanFace size={16} /> Login
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  className="gap-2"
                  onClick={() => router.push("/register")}
                >
                  <UserPlus size={16} /> Register
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
