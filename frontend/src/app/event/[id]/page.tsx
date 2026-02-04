'use client';

import React, { useEffect, useState, useRef, use } from 'react';
import Header from '@/components/Header';
import FlechadaLayer, { FlechadaHandle } from '@/components/FlechadaLayer';
import { User } from '@/types';
import { EVENTS } from '@/data/events';
import { 
  MapPin, 
  Calendar, 
  Share2, 
  Ticket, 
  MoreHorizontal,
  Heart,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'detalhes' | 'social'>('social');
  const flechadaRef = useRef<FlechadaHandle>(null);

  const event = EVENTS.find(e => e.id === id) || EVENTS[0];

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
        if (data.length > 0) {
          setCurrentUser(data[0]); // Simulate logged in user
        }
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlechada = async (targetUserId: string, e: React.MouseEvent) => {
    if (!currentUser) return;

    // Visual Feedback Position
    const targetEl = e.currentTarget.getBoundingClientRect();
    const senderEl = document.getElementById('user-avatar-hero')?.getBoundingClientRect();
    
    if (senderEl && flechadaRef.current) {
        flechadaRef.current.shoot(senderEl, targetEl);
    }

    // Backend Call
    try {
      await fetch(`${API_BASE_URL}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: targetUserId,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-primary-blue selection:text-white">
      <FlechadaLayer ref={flechadaRef} />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Event Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Poster */}
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 relative group">
              <img 
                src={event.image}
                alt="Event Poster" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="bg-pink-600/20 text-pink-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-pink-600/30">
                Em alta
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-none">
              {event.title}
            </h1>

            <div className="flex flex-col gap-3 text-gray-400 mb-8 text-lg">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-primary-blue" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-primary-blue" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Social Preview */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-4">
                {users.slice(0, 5).map(user => (
                  <div key={user.id} className="w-12 h-12 rounded-full border-2 border-black overflow-hidden relative bg-gray-800">
                     <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                  +120
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                amigos vão neste evento
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="flex-1 bg-primary-blue hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                <Ticket size={20} />
                Comprar ingresso
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('detalhes')}
              className={`pb-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === 'detalhes' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Detalhes
              {activeTab === 'detalhes' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-blue" />}
            </button>
            <button 
              onClick={() => setActiveTab('social')}
              className={`pb-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === 'social' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Social
              {activeTab === 'social' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-blue" />}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
                Carregando...
            </div>
          ) : activeTab === 'social' ? (
            <div>
                {/* Current User Display (The Sender) */}
                {currentUser && (
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 flex items-center gap-4">
                        <div id="user-avatar-hero" className="w-16 h-16 rounded-full border-2 border-primary-blue p-1">
                            <img src={currentUser.photo} alt="You" className="w-full h-full rounded-full object-cover bg-gray-800" />
                        </div>
                        <div>
                            <p className="text-sm text-primary-blue font-bold uppercase tracking-wider mb-1">Você está logado como</p>
                            <h3 className="text-xl font-bold text-white">{currentUser.name}</h3>
                        </div>
                    </div>
                )}

                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Zap className="text-yellow-400 fill-yellow-400" />
                    Quem vai
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {users.filter(u => u.id !== currentUser?.id).map((user) => (
                        <motion.div 
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary-blue/50 rounded-2xl p-4 flex flex-col items-center gap-4 transition-all group relative overflow-hidden"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 relative">
                                <img src={user.photo} alt={user.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            
                            <div className="text-center">
                                <h4 className="font-bold text-white truncate max-w-[150px]">{user.name}</h4>
                                <p className="text-xs text-gray-500">Confirmado</p>
                            </div>

                            <button 
                                onClick={(e) => handleFlechada(user.id, e)}
                                className="w-full mt-2 py-2 rounded-lg bg-white/5 hover:bg-primary-blue text-primary-blue hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-900/50"
                            >
                                <Heart size={16} className="transition-transform group-active:scale-125" />
                                Flechar
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-primary-blue">Sobre o evento</span>
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Prepare-se para a noite mais insana do ano! O {event.title} chega com tudo na {event.location} para um show exclusivo que vai parar a cidade. 
                  Com hits que estão dominando as paradas e uma vibe única, essa é a sua chance de curtir ao vivo.
                </p>
                <div className="mt-4 flex gap-2">
                   {event.tags.map(tag => (
                       <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-300">{tag}</span>
                   ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <h3 className="text-xl font-bold mb-4">Line-up</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center text-primary-blue font-bold">23:00</div>
                    <div>
                      <h4 className="font-bold text-white">DJ Warmup</h4>
                      <p className="text-sm text-gray-500">Hits do momento</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center text-primary-blue font-bold">01:00</div>
                    <div>
                      <h4 className="font-bold text-white">{event.title}</h4>
                      <p className="text-sm text-gray-500">Show Principal</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center text-primary-blue font-bold">03:00</div>
                    <div>
                      <h4 className="font-bold text-white">After Party</h4>
                      <p className="text-sm text-gray-500">Eletrônica</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
