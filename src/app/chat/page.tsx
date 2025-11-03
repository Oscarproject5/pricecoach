'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Share2, Upload, MoreVertical, MessageSquarePlus, Paperclip, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestionChips = [
  'Analyze my pricing strategy',
  'Compare revenue vs. expenses',
  'Show me key performance indicators',
  'Help me increase profit margins',
];

function ChatContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize session
  useEffect(() => {
    if (!sessionId || initialized) return;

    const initSession = async () => {
      try {
        const response = await fetch('/api/session/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ businessId: sessionId }),
        });

        const data = await response.json();

        if (data.message) {
          setMessages([
            {
              role: 'assistant',
              content: data.message,
              timestamp: new Date(),
            },
          ]);
        }
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initSession();
  }, [sessionId, initialized]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setShowSuggestions(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId,
        }),
      });

      const data = await response.json();

      if (data.response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col h-screen">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border bg-card px-6">
          <h2 className="text-lg font-semibold">Pricing Strategy Assistant</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 transition-colors rounded-lg hover:bg-accent text-muted-foreground">
              <Upload className="h-5 w-5" />
            </button>
            <button className="p-2 transition-colors rounded-lg hover:bg-accent text-muted-foreground">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 transition-colors rounded-lg hover:bg-accent text-muted-foreground">
              <MoreVertical className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center h-10 gap-2 px-4 ml-2 text-sm font-bold text-primary-foreground transition-colors rounded-lg bg-primary hover:bg-primary/90">
              <MessageSquarePlus className="h-4 w-4" />
              <span>New Chat</span>
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
            {messages.map((message, index) => (
              <div key={index}>
                {message.role === 'assistant' ? (
                  // AI Message
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full size-10 shrink-0 flex items-center justify-center text-white font-bold">
                      🎯
                    </div>
                    <div className="flex flex-1 flex-col items-start gap-3">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center gap-3">
                          <p className="font-bold">Price Coach</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="leading-relaxed bg-card p-4 rounded-xl rounded-tl-none border border-border">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>

                      {/* Show suggestion chips after first AI message */}
                      {index === 0 && showSuggestions && (
                        <div className="flex gap-2 flex-wrap">
                          {suggestionChips.map((chip, chipIndex) => (
                            <button
                              key={chipIndex}
                              onClick={() => handleSuggestionClick(chip)}
                              className="h-8 items-center justify-center rounded-lg bg-accent border border-border px-3 text-sm font-medium hover:bg-primary/10 transition-colors"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // User Message
                  <div className="flex items-start gap-4 justify-end">
                    <div className="flex flex-1 flex-col gap-1 items-end max-w-xl">
                      <p className="text-sm font-normal text-muted-foreground">
                        You - {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <div className="leading-relaxed rounded-xl rounded-br-none px-4 py-3 bg-primary text-primary-foreground">
                        {message.content}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full size-10 shrink-0 flex items-center justify-center text-white font-bold">
                      U
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full size-10 shrink-0 flex items-center justify-center text-white font-bold">
                  🎯
                </div>
                <div className="flex items-center gap-2 bg-card p-4 rounded-xl border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                  <span className="ml-2 text-sm text-muted-foreground">Coach is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="shrink-0 border-t border-border bg-card p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about pricing strategies, profit margins, or business insights..."
                className="w-full resize-none rounded-xl border-border bg-accent py-3 pl-12 pr-16 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
                rows={1}
                disabled={loading}
              />
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-primary/10 text-muted-foreground transition-colors"
                disabled={loading}
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-muted-foreground">Loading chat...</div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
