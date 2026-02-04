'use client';

import React, { useEffect, useState, useRef } from 'react';
import UserCard from '@/components/UserCard';
import FlechadaLayer, { FlechadaHandle } from '@/components/FlechadaLayer';
import { User } from '@/types';
import { ArrowLeftRight, Users as UsersIcon, Loader2 } from 'lucide-react';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sending, setSending] = useState(false);
  const flechadaRef = useRef<FlechadaHandle>(null);

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
          setCurrentUser(data[0]); // Default to first user
        }
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFlechada = async (targetUserId: string) => {
    if (!currentUser || sending) return;

    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) return;

    setSending(true);

    // Trigger Animation
    const senderEl = document.getElementById(`header-avatar-${currentUser.id}`);
    const targetEl = document.getElementById(`card-avatar-${targetUserId}`);

    if (senderEl && targetEl && flechadaRef.current) {
      const senderRect = senderEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      flechadaRef.current.shoot(senderRect, targetRect);
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: targetUserId,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send flechada');
      }
      
      // Optional: Show success toast or something
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar flechada');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-pink-500" size={48} />
          <p className="text-gray-500">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <FlechadaLayer ref={flechadaRef} />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-pink-100 p-2 rounded-lg">
              <UsersIcon className="text-pink-600" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
              Nittio
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">Você está agindo como:</span>
            <div className="relative group">
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">
                {currentUser && (
                  <>
                    <img 
                      id={`header-avatar-${currentUser.id}`} // ID for animation source
                      src={currentUser.photo} 
                      alt={currentUser.name} 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                    <span className="font-medium text-sm text-gray-700">{currentUser.name}</span>
                  </>
                )}
              </button>
              
              {/* Simple User Switcher Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">Trocar Usuário</p>
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => setCurrentUser(u)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-pink-50 transition-colors ${currentUser?.id === u.id ? 'bg-pink-50 text-pink-700 font-medium' : 'text-gray-600'}`}
                    >
                      <img src={u.photo} className="w-6 h-6 rounded-full" alt="" />
                      {u.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Encontre sua conexão</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Envie uma flechada para quem você curtiu! A interação é instantânea e divertida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              isCurrentUser={currentUser?.id === user.id}
              onSendFlechada={handleSendFlechada}
              disabled={sending}
            />
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-12 py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Nittio Teste Técnico. Desenvolvido com Next.js e MongoDB.</p>
        </div>
      </footer>
    </div>
  );
}
