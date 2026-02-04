import React from 'react';
import { User } from '@/types';
import { Heart, Send } from 'lucide-react';

interface UserCardProps {
  user: User;
  isCurrentUser: boolean;
  onSendFlechada: (userId: string) => void;
  disabled?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isCurrentUser, onSendFlechada, disabled }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-6 border ${isCurrentUser ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-100'}`}>
      <div className="relative mb-4">
        <img 
          id={`card-avatar-${user.id}`} // ID for animation target
          src={user.photo} 
          alt={user.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
        />
        {isCurrentUser && (
          <div className="absolute bottom-0 right-0 bg-pink-500 text-white p-1 rounded-full border-2 border-white" title="Você">
            <Heart size={12} fill="currentColor" />
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{user.name}</h3>
      
      {!isCurrentUser && (
        <button
          onClick={() => onSendFlechada(user.id)}
          disabled={disabled}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-700 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>Flechar</span>
          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {isCurrentUser && (
        <div className="mt-2 text-sm text-gray-500 italic">
          (Você)
        </div>
      )}
    </div>
  );
};

export default UserCard;
