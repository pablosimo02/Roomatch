import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#C8F4FF] text-[#1A1A2E] selection:bg-[#FF385C]/30">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="p-6 md:p-8 lg:p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
