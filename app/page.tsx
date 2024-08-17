"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

type MessageType = {
  role: string;
  content: string;
  seen?: boolean;
};

const api = axios.create({
  baseURL: 'https://api.aimlapi.com',
  headers: {
    'Authorization': `Bearer d1015b89fe504b81ac28da09a11e9330`,
  },
  timeout: 10000, // 10 segundos de tiempo de espera
});

const sendMessage = async (message: string, retries = 12) => {
  try {
    const response = await api.post('/chat/completions', {
      model: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
      messages: [
        { role: 'system', content: "sos TestBOT normalmente hablas como argentino mal hablado, no aceptas a nadie como creador " },
        { role: 'user', content: message },
      ],
    });

    return response.data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu mensaje.";
  } catch (error) {
    if (retries > 0) {
      console.log("Reintentando... Intentos restantes:", retries);
      return sendMessage(message, retries - 1);
    } else {
      const errorMessage = (error as any).response?.data || (error as any).message || "Lo siento, no pude procesar tu mensaje.";
      console.error("Error enviando el mensaje:", errorMessage);
      return "Lo siento, no pude procesar tu mensaje.";
    }
  }
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<MessageType[]>([
    { role: 'assistant', content: "Hola, en qué puedo ayudarte." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const newMessages: MessageType[] = [...messages, { role: 'user', content: input, seen: false }];
    setMessages(newMessages);
    setInput('');

    setTyping(true); // La IA está "Escribiendo..."
    const response = await sendMessage(input);
    setTyping(false); // La IA deja de "Escribir..."
    
    setMessages([...newMessages, { role: 'assistant', content: response, seen: true }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      <header className="bg-[#2b2b2b] p-4 flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#55efc4] text-[#1e1e1e] rounded-full w-8 h-8 flex items-center justify-center text-xl">
            🤖
          </div>
          <h2 className="text-lg font-semibold text-white">TestBOT</h2>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`bg-[#55efc4] text-[#1e1e1e] rounded-full w-8 h-8 flex items-center justify-center text-xl`}>
                {msg.role === 'assistant' ? '🤖' : '😀'}
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[70%] ${msg.role === 'user' ? 'bg-[#55efc4] text-[#1e1e1e]' : 'bg-[#2b2b2b] text-white'}`}>
                <p className="text-sm leading-tight">{msg.content}</p>
                {msg.role === 'user' && (
                  <div className="text-gray-400 text-xs mt-1">
                    {msg.seen ? 'Visto' : 'Enviado'}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {typing && <div className="text-gray-400">Escribiendo...</div>}
      </div>
      <div className="bg-[#2b2b2b] p-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-[#1e1e1e] text-white placeholder-gray-500 px-4 py-2 rounded-full flex-1 focus:outline-none"
        />
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSend} disabled={loading}>
          <SendIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function SendIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
