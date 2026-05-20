import React from 'react';
import Link from 'next/link';

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
      className="flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer hover:bg-gray-50 group bg-white border border-gray-100"
    >
      <div className="relative">
        <img src={chat.user.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-200" alt={chat.user.name} />
        {chat.unread && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-sm truncate text-[#1A1A2E]">{chat.user.name}</span>
          <span className="text-[10px] text-[#6B7280]">{chat.timestamp}</span>
        </div>
        <p className={`text-xs truncate ${chat.unread ? 'text-[#1A1A2E] font-medium' : 'text-[#6B7280]'}`}>{chat.lastMessage}</p>
      </div>
    </Link>
  );
}
