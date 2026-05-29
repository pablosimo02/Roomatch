"use client";
import React from 'react';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function sanitizeInput(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

interface MessageBubbleProps {
  message: {
    text: string;
    isMe: boolean;
    timestamp: string;
  };
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={cn("flex w-full mb-4", message.isMe ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm",
        message.isMe
          ? "bg-primary text-white rounded-tr-none"
          : "bg-white/10 text-text-primary rounded-tl-none border border-white/10"
      )}>
        <p>{message.text}</p>
        <span className={cn(
          "text-[10px] block mt-1 opacity-60",
          message.isMe ? "text-right" : "text-left"
        )}>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

export default function ChatWindow({ userId }: { userId: string }) {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    { text: 'Hola! He visto tu anuncio del piso en Ruzafa.', isMe: false, timestamp: '10:30 AM' },
    { text: '¡Hola! Sí, sigue disponible. ¿Cuándo te vendría bien verlo?', isMe: true, timestamp: '10:32 AM' },
    { text: 'Mañana a las 18:00 me va bien. ¿Te parece?', isMe: false, timestamp: '10:35 AM' },
    { text: 'Perfecto, te mando la ubicación exacta.', isMe: true, timestamp: '10:36 AM' },
  ]);

  const handleSendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || trimmed.length > 500) return;

    const sanitizedMessage = sanitizeInput(trimmed);
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = { text: sanitizedMessage, isMe: true, timestamp };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    try {
      const token = localStorage.getItem("roomatch_token");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: sanitizedMessage, receiverId: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg = {
          text: data.data?.message || "Disculpa, no puedo responder ahora.",
          isMe: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error("API error");
      }
    } catch {
      const fallbackResponses = [
        "¡Hola! Sí, la habitación sigue disponible. ¿Te gustaría venir a verla esta semana?",
        "Me parece genial. ¿En qué horario te vendría mejor quedar?",
        "Tengo un perfil muy orientado al estudio, así que busco a alguien tranquilo.",
      ];
      const aiMsg = {
        text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        isMe: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-bg-card border border-white/10 shadow-2xl">
      <div className="p-4 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden">
            <img src="https://picsum.photos/seed/fallback/800/600" className="w-full h-full object-cover" alt="User" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sm">Pablo UV</h3>
            <span className="text-[10px] text-accent flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online
            </span>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-white/10 transition-all">
          <MoreVertical className="w-5 h-5 text-text-muted" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>

      <div className="p-4 border-t border-white/10 backdrop-blur-md bg-white/5">
        <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-2 focus-within:border-primary transition-all">
          <button className="text-text-muted hover:text-white transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe un mensaje..."
            maxLength={500}
            className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary py-2"
          />
          <button className="text-text-muted hover:text-white transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || message.length > 500}
            className="p-2 bg-primary rounded-xl text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
