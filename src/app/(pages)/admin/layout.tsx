"use client";

import Header from "../(main)/_components/header";



const ViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0e7ff] to-[#f8fafc] ">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 bg-white py-6 px-30  min-h-[600px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ViewLayout;