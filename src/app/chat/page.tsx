"use client";
import React from 'react';
import { Search, MessageSquare } from 'lucide-react';
import ChatListItem from '@/components/chat/ChatListItem';

const MOCK_CHATS = [
  {
    id: 'c1',
    user: { name: 'Pablo UV', avatar: 'https://picsum.photos/seed/chat1/800/600' },
    lastMessage: 'Mañana a las 18:00 me va bien. ¿Te parece?',
    timestamp: '10:35 AM',
    unread: true,
  },
  {
    id: 'c2',
    user: { name: 'Sarah Erasmus', avatar: 'https://picsum.photos/seed/chat2/800/600' },
    lastMessage: 'Hola! Me gustaría saber más sobre el piso.',
    timestamp: 'Ayer',
    unread: false,
  },
  {
    id: 'c3',
    user: { name: 'Maria Landlord', avatar: 'https://picsum.photos/seed/chat3/800/600' },
    lastMessage: 'He recibido tu solicitud de visita.',
    timestamp: 'Lunes',
    unread: false,
  },
];

export default function ChatPage() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-clash text-[#1A1A2E]">Mensajes</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar conversación..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-[#1A1A2E] placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        <div className="w-full lg:w-80 h-full flex flex-col gap-3 overflow-y-auto">
          {MOCK_CHATS.map(chat => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}
        </div>

        <div className="flex-1 h-full">
          <div className="h-full flex items-center justify-center text-center p-12 rounded-2xl border-2 border-dashed border-gray-200 bg-white">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <p className="text-[#6B7280] font-medium max-w-xs">
                Selecciona una conversación para empezar a chatear con tu futuro compañero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
