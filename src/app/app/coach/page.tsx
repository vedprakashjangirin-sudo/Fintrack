'use client';

import { Bot, User, Mic, MicOff, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { askVoiceCoach } from '@/app/actions/coach';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
};

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: "Hi! I'm your FinTrack coach. I have access to your household's financial data. Tap the microphone and ask me a question!",
    }
  ]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        
        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          
          // Add temporary user message
          const msgId = Date.now().toString();
          setMessages(prev => [...prev, { id: msgId, role: 'user', text: '🎤 (Voice Message)' }]);
          setIsProcessing(true);

          const res = await askVoiceCoach(base64Audio, messages.filter(m => m.id !== 'welcome'));
          
          setIsProcessing(false);
          if (res.error) {
            setError(res.error);
          } else if (res.success && res.text) {
            setMessages(prev => [...prev, { id: Date.now().toString() + 'ai', role: 'ai', text: res.text! }]);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      setError('Microphone access denied or unavailable.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks to turn off the microphone light
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#0F172A]">AI Voice Coach</h1>
        <p className="text-[#475569]">Powered by Gemini 1.5 Flash. Speak to your financial data.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#FAFAFA]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100' : 'bg-[#0F172A]'}`}>
                {msg.role === 'user' ? <User size={16} className="text-indigo-600" /> : <Bot size={16} className="text-white" />}
              </div>
              <div className={`p-4 rounded-xl shadow-sm max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-[#0F172A] text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none text-[#0F172A] [&>p]:mb-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-2'}`}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center flex-shrink-0">
                <Loader2 size={16} className="text-white animate-spin" />
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-xl rounded-tl-none shadow-sm">
                <p className="text-sm text-[#475569] italic">Listening and thinking...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 text-center">
              {error}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white border-t border-gray-200 flex flex-col items-center justify-center flex-shrink-0">
          <button 
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={isProcessing}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isRecording 
                ? 'bg-red-500 scale-110 animate-pulse shadow-red-200' 
                : 'bg-[#0F172A] hover:bg-[#1e293b] hover:scale-105'
            } disabled:opacity-50 disabled:hover:scale-100`}
          >
            {isRecording ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
          </button>
          <p className="text-xs text-[#475569] font-medium mt-3">
            {isRecording ? 'Release to send' : 'Hold to speak'}
          </p>
        </div>

      </div>
    </div>
  );
}
