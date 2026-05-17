"use client";
import React from 'react';
import { Search, MessageSquare } from 'lucide-react';
import ChatListItem from '@/components/chat/ChatListItem';

const MOCK_CHATS = [
  {
    id: 'c1',
    user: { name: 'Pablo UV', avatar: 'https://picsum.photos/seed/fallback/800/600' },
    lastMessage: 'Mañana a las 18:00 me va bien. ¿Te parece?',
    timestamp: '10:35 AM',
    unread: true,
  },
  {
    id: 'c2',
    user: { name: 'Sarah Erasmus', avatar: 'https://picsum.photos/seed/fallback/800/600' },
    lastMessage: 'Hola! Me gustaría saber más sobre el piso.',
    timestamp: 'Ayer',
    unread: false,
  },
  {
    id: 'c3',
    user: { name: 'Maria Landlord', avatar: 'https://picsum.photos/seed/fallback/800/600' },
    lastMessage: 'He recibido tu solicitud de visita.',
    timestamp: 'Lunes',
    unread: false,
  },
];

export default function ChatPage() {
  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-120px)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-4xl font-bold font-clash">Mensajes</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar conversación..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
        {/* Chat List */}
        <div className="w-full lg:w-80 h-full flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          {MOCK_CHATS.map(chat => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}
        </div>

        {/* Chat Window Display */}
        <div className="flex-1 h-full">
          <div className="h-full flex items-center justify-center text-center p-12 rounded-3xl border-2 border-dashed border-white/10 bg-white/5">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <p className="text-text-muted font-medium max-w-xs">
                Selecciona una conversación para empezar a chatear con tu futuro compañero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
