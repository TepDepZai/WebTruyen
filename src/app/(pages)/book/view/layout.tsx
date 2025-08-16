"use client";

import Header from "../../(main)/_components/header";


const ViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0e7ff] to-[#f8fafc] ">
      <Header />
      <div className="flex flex-1 px-4 pb-4 gap-6">
        <main className="flex-1 bg-white rounded-xl shadow-lg p-6 min-h-[600px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ViewLayout;