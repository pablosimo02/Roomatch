import React from 'react';
import { User, MessageSquare, Search, MoreVertical } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatItemProps {
  chat: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    lastMessage: string;
    timestamp: string;
    unread: boolean;
  };
}

export default function ChatListItem({ chat }: ChatItemProps) {
  return (
    <Link
      href={`/chat/${chat.id}`}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer hover:bg-white/5 group"
    >
      <div className="relative">
        <img src={chat.user.avatar} className="w-12 h-12 rounded-full object-cover border border-white/10" alt={chat.user.name} />
        {chat.unread && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-bg-dark" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-sm truncate">{chat.user.name}</span>
          <span className="text-[10px] text-text-muted">{chat.timestamp}</span>
        </div>
        <p className="text-xs text-text-muted truncate">{chat.lastMessage}</p>
      </div>
    </Link>
  );
}
