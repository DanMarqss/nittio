'use client';

import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { EVENTS } from '@/data/events';
import { Calendar, MapPin } from 'lucide-react';

export default function Home() {
  const trendingEvents = EVENTS.filter(e => e.isTrending);
  const forYouEvents = EVENTS.filter(e => !e.isTrending); // Just simpler logic for now

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-primary-blue selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Em Alta */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Em alta</h2>
            <button className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">
              Ver tudo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {trendingEvents.map(event => (
              <Link href={`/event/${event.id}`} key={event.id} className="group relative block rounded-2xl overflow-hidden aspect-video">
                 <img 
                   src={event.image} 
                   alt={event.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-black mb-2 uppercase italic">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-primary-blue" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-primary-blue" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <span className="bg-pink-600/20 text-pink-500 px-2 py-1 rounded text-xs font-bold uppercase border border-pink-600/30">Em alta</span>
                        <span className="bg-white/10 text-white px-2 py-1 rounded text-xs font-bold uppercase border border-white/10">Conexões rolando</span>
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Para você */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Para você</h2>
            <button className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">
              Ver tudo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {forYouEvents.map(event => (
               <Link href={`/event/${event.id}`} key={event.id} className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-primary-blue/30 transition-all">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold">
                        {event.date.split(' - ')[0]}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{event.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <MapPin size={12} />
                        <span className="truncate">{event.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">{tag}</span>
                        ))}
                    </div>
                  </div>
               </Link>
             ))}
          </div>
        </section>
      </main>
    </div>
  );
}
