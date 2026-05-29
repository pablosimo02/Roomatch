"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
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

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente de RooMatch. ¿En qué puedo ayudarte hoy con tu búsqueda de piso en Valencia?',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > 500) return;

    const sanitizedInput = sanitizeInput(trimmed);
    const userMsg: Message = {
      id: Date.now().toString(),
      text: sanitizedInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem("roomatch_token");
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ type: "chat", message: sanitizedInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: data.data?.response || "Disculpa, no puedo procesar tu mensaje ahora.",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      } else {
        let aiResponse = "Interesante... Déjame analizar los datos de Valencia. En general, te recomendaría mirar en Benimaclet si buscas algo más tranquilo y cerca de la universidad.";
        const lowerInput = sanitizedInput.toLowerCase();
        if (lowerInput.includes('ruzafa')) {
          aiResponse = "Ruzafa es el barrio más trendy. Precios aprox: 450€-550€/hab. Muy vibrante, pero puede ser ruidoso los fines de semana.";
        } else if (lowerInput.includes('benimaclet')) {
          aiResponse = "Benimaclet es la zona universitaria por excelencia. Precios más moderados (~380€) y ambiente muy joven.";
        } else if (lowerInput.includes('precio') || lowerInput.includes('cuánto')) {
          aiResponse = "Los precios varían mucho. Ruzafa ~480€, Benimaclet ~380€ y El Carmen ~490€. ¿Cuál es tu presupuesto máximo?";
        } else if (lowerInput.includes('eco') || lowerInput.includes('sostenible')) {
          aiResponse = "El EcoScore mide la eficiencia energética, cercanía al metro y huella de CO2. ¡Busca los anuncios con badge verde!";
        }
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, ha habido un error de conexión. Inténtalo de nuevo.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-[380px] h-[600px] rounded-3xl bg-bg-card border border-white/10 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            <div className="p-4 bg-primary flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">RooMatch AI</h3>
                  <span className="text-[10px] opacity-80">Asistente de Valencia</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className={cn("flex flex-col", msg.sender === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm",
                    msg.sender === 'user'
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white/10 text-text-primary rounded-tl-none border border-white/10"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-text-muted mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 p-2 text-text-muted text-xs italic animate-pulse">
                  <Sparkles className="w-3 h-3" /> RooMatch AI esta pensando...
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregunta sobre Valencia..."
                maxLength={500}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary transition-all text-text-primary"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || input.length > 500}
                className="p-2 bg-primary rounded-xl text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/40 border border-white/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
