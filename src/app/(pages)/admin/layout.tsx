"use client";

import Header from "../(main)/_components/header";



const ViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0B0B0E] to-[#1B1B23]">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default ViewLayout;