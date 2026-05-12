import React from 'react';
import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatDetail() {
  return (
    <div className="h-[calc(100vh-120px)]">
      <ChatWindow userId="u1" />
    </div>
  );
}
