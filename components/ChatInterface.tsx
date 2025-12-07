import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, FileText, X } from 'lucide-react';
import { ChatMessage, FileNode } from '../types';
import { sendMessageStream } from '../services/geminiService';

interface ChatInterfaceProps {
    activeFile?: FileNode | null;
    onClearFile?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ activeFile, onClearFile }) => {
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

    try {
      let prompt = input;
      if (activeFile) {
        prompt = `Context File: ${activeFile.name}\nContent:\n${activeFile.content}\n\nUser Question: ${input}`;
      }

      // Create a placeholder for the model response
      const modelMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: modelMessageId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      let accumulatedText = '';
      const stream = await sendMessageStream(prompt);
      
      for await (const chunk of stream) {
        accumulatedText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: accumulatedText }
            : msg
        ));
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        isError: true
      }]);
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
      <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <Sparkles size={18} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">Agape Intelligence</h3>
                <p className="text-xs text-slate-500">Sovariel Module Active</p>
            </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-600 text-white'
            }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-tr-none' 
                    : 'bg-indigo-600 text-white rounded-tl-none shadow-md shadow-indigo-200'
            } ${msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-[10px] mt-2 opacity-70 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                    <Bot size={16} />
                 </div>
                 <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        {activeFile && (
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 mb-3">
                <div className="flex items-center gap-2 text-indigo-700">
                    <FileText size={16} />
                    <span className="text-sm font-medium">Context: {activeFile.name}</span>
                </div>
                {onClearFile && (
                    <button onClick={onClearFile} className="text-indigo-400 hover:text-indigo-700 transition-colors">
                        <X size={16} />
                    </button>
                )}
            </div>
        )}
        
        <div className="relative">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Agape..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none"
                rows={1}
                style={{ minHeight: '46px', maxHeight: '120px' }}
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
                <Send size={16} />
            </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
            Agape may display creativity. Verify critical code and ethical decisions.
        </p>
      </div>
    </div>
  );
};