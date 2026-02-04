import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20L20 30L35 10" stroke="#0055FF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold text-primary-blue tracking-tight">Nittio</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Em alta</a>
            <a href="#" className="hover:text-white transition-colors">Para você</a>
            <a href="#" className="hover:text-white transition-colors">Eventos</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Sua próxima experiência..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-48"
            />
          </div>
          
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
