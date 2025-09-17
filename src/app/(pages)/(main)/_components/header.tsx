"use client";

import { AdminIcon } from "@/components/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/authProvider";
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

const Header = () => {
  const { user, setUser, loading } = useAuth();
  const router = useRouter();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "Admin";

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


  const topOptions = [
    { label: "Top day", path: "/top/day" },
    { label: "Top week", path: "/top/week" },
    { label: "Top month", path: "/top/month" },
  ];

  const genreOptions = [
    { label: "Manga", path: "/genre/manga" },
    { label: "Manhua", path: "/genre/manhua" },
    { label: "Manhwa", path: "/genre/manhwa" },
    { label: "Cổ tích", path: "/genre/fairy-tale" },
  ];

  return (
    <header className="h-16 w-full bg-gradient-to-r from-[#52357B] to-[#3B5C7E] border-b border-gray-400 shadow-lg flex items-center justify-between px-6 gap-4">
      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="text-white font-extrabold text-2xl tracking-wide font-mono drop-shadow-lg select-none cursor-pointer"
      >
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
            {topOptions.map((opt) => (
              <DropdownMenuItem
                key={opt.path}
                onClick={() => router.push(opt.path)}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
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
            {genreOptions.map((opt) => (
              <DropdownMenuItem
                key={opt.path}
                onClick={() => router.push(opt.path)}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Search bar */}
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
          <Search size={20} />
        </button>
      </div>
      {/* Account menu */}
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

            <>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => router.push("/profile")}
              >
                <User size={16} /> Profile
              </DropdownMenuItem>

              {isAdmin && (
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/admin/user")}
                >
                  <AdminIcon /> Admin Panel
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

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
            </>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
