"use client";

import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from 'axios';

// API configuration
const api = axios.create({
  baseURL: 'https://api.aimlapi.com',
  headers: {
    'Authorization': `Bearer e3b0eaf24b4541c397175a68620a3484`,
  },
});

// Function to send message and get response
const sendMessage = async (message: string) => {
  try {
    const response = await api.post('/chat/completions', {
      model: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
      messages: [
        { role: 'system', content: 'You are an AI assistant who knows everything.' },
        { role: 'user', content: message },
      ],
    });

    return response.data.choices?.[0]?.message?.content || "Sorry, I couldn't process your message.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "Sorry, I couldn't process your message.";
  }
};

export function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm the Chatbot, how can I assist you today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await sendMessage(input);
    setMessages([...newMessages, { role: 'assistant', content: response }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <header className="flex items-center gap-4 px-4 py-3 border-b border-gray-700 bg-gray-800">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="Chatbot Avatar" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium">Chatbot</div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              )}
              <div className={`bg-${msg.role === 'user' ? 'blue-600' : 'gray-700'} text-${msg.role === 'user' ? 'white' : 'gray-100'} rounded-lg p-3 max-w-[80%]`}>
                <p className="text-sm">{msg.content}</p>
              </div>
              {msg.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Chatbot Avatar" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full rounded-lg pr-12 border-2 border-gray-700 bg-gray-900 text-gray-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            rows={1}
          />
          <Button
            onClick={handleSend}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-gray-400 hover:bg-gray-700 hover:text-gray-100"
          >
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
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
