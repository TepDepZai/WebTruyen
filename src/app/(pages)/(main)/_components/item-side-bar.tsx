import { cn } from "@/lib/utils";
import { CircleAlert, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ItemsSideBar = () => {
  const sidebar = [
    {
      Title: "Schedule Web",
      Icon: CircleAlert,
      Items: [
        {
          title: "Abou Us",
          href: "/about",
        },
        {
          title: "Site Rules",
          href: "/rules",
        },
        {
          title: "Announcements",
          href: "/announcements",
        },
      ],
    },
  ];

  const router = useRouter();
  const pathname = usePathname()
  const isHome = (pathname === "/")

  return (
    <div className="flex flex-col w-[90%] h-full mx-auto">
      <div
        onClick={() => router.push("/")}
        className="text-white p-2 cursor-pointer"
      >
        <p
          className={cn(
            "flex items-center text-lg hover:bg-violet-600/65 font-bold rounded-sm transition-all ease-in-out duration-300",
            isHome && "bg-yellow-500 w-full p-0.5 hover:bg-yellow-600"
          )}
        >
          <Home className="w-6 h-6 mr-1" /> Home
        </p>
      </div>

      {sidebar.map((si_item) => (
        <div key={si_item.Title} className="text-white p-2 flex flex-col">
          <p className="flex items-center text-lg font-bold select-none pb-2">
            <si_item.Icon className="w-6 h-6 mr-1" /> {si_item.Title}
          </p>

          {si_item.Items.map((item) => (
            <div
              key={item.title}
              className={cn(
                "cursor-pointer text-base hover:bg-violet-600/65 rounded-md mb-1 transition-all ease-in-out duration-300",
                pathname === item.href || pathname?.startsWith(`${item.href}/`) && "bg-yellow-500 w-full p-0.5 hover:bg-yellow-700"
              )}
              onClick={() => router.push(item.href)}
            >
              <p className="pl-2">{item.title}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ItemsSideBar;
