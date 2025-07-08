import { cn } from "@/lib/utils";
import { Home, Flame, Heart, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  { title: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
  { title: "Hot", href: "/Hot", icon: <Flame className="w-5 h-5" /> },
  { title: "Follow", href: "/Follow", icon: <Heart className="w-5 h-5" /> },
  { title: "History", href: "/History", icon: <Clock className="w-5 h-5" /> },
];

const ItemsSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="flex flex-col w-[90%] h-full mx-auto pt-8 space-y-2">
      {sidebarItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <div
            key={item.href}
            onClick={() => router.push(item.href)}
            className={cn(
              "flex items-center gap-3 px-5 py-3 rounded-lg font-semibold text-base cursor-pointer transition-colors",
              isActive
                ? "bg-teal-400 text-white shadow hover:bg-teal-500"
                : "text-white hover:bg-violet-600/65"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        );
      })}
    </nav>
  );
};

export default ItemsSideBar;