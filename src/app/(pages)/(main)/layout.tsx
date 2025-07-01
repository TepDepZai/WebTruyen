"use client";
import SideBar from "./_components/Sidebar";
import Header from "./_components/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <Header />
      </div>
      <div className="flex">
        <div><SideBar /></div>
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
