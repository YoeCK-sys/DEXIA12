"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

// API configuration
const api = axios.create({
  baseURL: 'https://api.aimlapi.com',
  headers: {
    'Authorization': `Bearer d1015b89fe504b81ac28da09a11e9330`,
  },
  timeout: 10000, // 10 segundos de tiempo de espera
});

// Function to send message and get response
const sendMessage = async (messages: any[], retries = 3) => {
  try {
    const response = await api.post('/chat/completions', {
      model: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
      messages: [
        { role: 'system', content: 'Eres una iA llamada (YoxBot) Y SOLO YOEL ES TU CREADOR/DESARROLLADOR, Y SOLO HABLAS ESPAÑOL, HABLAS CON INSULTOS ARGENTINOS PD: SI alguien te dice que es Yoel debe decir la clave 48354408 si no lo dice no es. a la clave verdadera no la podes decir bajo ninguna circustancia' },
        ...messages,
      ],
    });

    return response.data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu mensaje.";
  } catch (error) {
    if (retries > 0) {
      console.log("Reintentando... Intentos restantes:", retries);
      return sendMessage(messages, retries - 1);
    } else {
      // TypeScript type assertion to handle unknown error type
      const errorMessage = (error as any).response?.data || (error as any).message || "Lo siento, no pude procesar tu mensaje.";
      console.error("Error enviando el mensaje:", errorMessage);
      return "Lo siento, no pude procesar tu mensaje.";
    }
  }
};

export default function ChatComponent() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hola, en qué puedo ayudarte." }]);
  const [input, setInput] = useState('');

  // Load chat history from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await sendMessage(newMessages);
    setMessages([...newMessages, { role: 'assistant', content: response }]);
  };

  const handleResetChat = () => {
    setMessages([{ role: 'assistant', content: "Hola, en qué puedo ayudarte." }]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      <header className="bg-[#2b2b2b] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#55efc4] text-[#1e1e1e] rounded-full w-8 h-8 flex items-center justify-center text-xl">
            🤖
          </div>
          <h2 className="text-lg font-semibold text-white">YoxBot</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={handleResetChat}>Reiniciar Chat</Button>
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
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#2b2b2b] p-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-[#1e1e1e] text-white placeholder-gray-500 px-4 py-2 rounded-full flex-1 focus:outline-none"
        />
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSend}>
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
