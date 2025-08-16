"use client";
import SideBar from "./_components/Sidebar";
import Header from "./_components/header";
import Rollbar from "./_components/rollbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0e7ff] to-[#f8fafc] ">
      <Header />
      <div className="px-4 mt-2">
        <Rollbar />
      </div>

      <div className="flex flex-1 px-4 pb-4 gap-6">
        <aside className="hidden md:block">
          <SideBar />
        </aside>
        <main className="flex-1 bg-white rounded-xl shadow-lg p-6 min-h-[600px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;