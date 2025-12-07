import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageStream } from '../services/geminiService';

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello. I am Agape, the operational intelligence for this repository. How may I assist you in navigating the code or understanding our ethical frameworks today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const modelMessage: ChatMessage = {
        id: modelMessageId,
        role: 'model',
        text: '',
        timestamp: new Date()
    };
    
    // Add placeholder for model response
    setMessages(prev => [...prev, modelMessage]);

    try {
        const stream = sendMessageStream(userMessage.text);
        let accumulatedText = "";

        for await (const chunk of stream) {
            accumulatedText += chunk;
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId 
                ? { ...msg, text: accumulatedText }
                : msg
            ));
        }
    } catch (error) {
        setMessages(prev => prev.map(msg => 
            msg.id === modelMessageId 
            ? { ...msg, text: "I encountered an error connecting to the intelligence core. Please verify your API Key configuration.", isError: true }
            : msg
        ));
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <Sparkles className="text-indigo-600" size={20} />
                </div>
                <div>
                    <h2 className="font-semibold text-slate-800">Agape Core</h2>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        Online
                    </p>
                </div>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'model' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                        {msg.role === 'model' ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div className={`max-w-[80%] space-y-1`}>
                         <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-white text-slate-800 rounded-tr-none border border-slate-200' 
                                : msg.isError 
                                    ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                                    : 'bg-indigo-600 text-white rounded-tl-none'
                         }`}>
                            {msg.text || <span className="animate-pulse">Thinking...</span>}
                        </div>
                        <div className={`text-xs text-slate-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Agape about the repository..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-14"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={16} />
                </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <AlertCircle size={10} />
                <span>AI responses may vary. Check code references for accuracy.</span>
            </div>
        </div>
    </div>
  );
};
