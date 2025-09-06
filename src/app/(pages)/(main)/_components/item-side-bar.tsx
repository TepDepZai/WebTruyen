import { cn } from "@/lib/utils";
import { Home, Flame, Heart, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Hot", href: "/Hot", icon: Flame },
  { title: "Follow", href: "/Follow", icon: Heart },
  { title: "History", href: "/History", icon: Clock },
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
              "flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-base cursor-pointer transition-all duration-300",
              isActive
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg scale-[1.02]"
                : "text-gray-200 hover:bg-violet-600/70 hover:text-white"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-white" : "text-gray-300 group-hover:text-white"
              )}
            />
            <span>{item.title}</span>
          </div>
        );
      })}
    </nav>
  );
};

export default ItemsSideBar;
