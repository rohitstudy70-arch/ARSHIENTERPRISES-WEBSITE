import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, BUSINESS } from '../config/environment';
import { FaPaperPlane, FaWhatsapp, FaTimes, FaCommentDots, FaRobot, FaUser } from 'react-icons/fa';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true); // Open by default
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'नमस्ते! Arshi GPS में आपका स्वागत है। मैं आपकी गाड़ी या फ्लीट को ट्रैक करने के लिए सही GPS ट्रैकर चुनने में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?',
      time: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMessage = {
      sender: 'user',
      text: messageText,
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Send message to our Express backend route
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage.text,
        history: messages.slice(-6).map(m => ({ sender: m.sender, text: m.text }))
      });

      const botMessage = {
        sender: 'bot',
        text: response.data.reply,
        time: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'माफ़ कीजिये, सर्वर से जुड़ने में तकनीकी खराबी आ रही है। आप हमसे सीधे WhatsApp पर भी बात कर सकते हैं।',
        time: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  const suggestions = [
    'GPS Tracker की कीमत क्या है?',
    'क्या आप Installation सपोर्ट देते हैं?',
    'मेरे पास Truck/Bike है, कौन सा GPS सही रहेगा?',
    'मुझे Call Back चाहिए।'
  ];

  // Render Launcher Badge when closed
  if (!isOpen) {
    return (
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce"
        title="Open Chat Support"
      >
        <FaCommentDots size={24} />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-[360px] h-[480px] flex flex-col bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden font-sans transition-all duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#001a4d] to-[#0033cc] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="bg-white/10 p-2 rounded-full">
            <FaRobot className="text-lg text-[#ff6b35] animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">Arshi GPS Support</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] text-sky-200">Active Agent | Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href={`https://wa.me/${BUSINESS.WHATSAPP.replace(/[-+]/g, '')}`} 
            target="_blank" 
            rel="noreferrer"
            className="bg-green-500 hover:bg-green-600 transition-colors p-1.5 rounded-full text-white"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={14} />
          </a>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-sky-200 hover:text-white p-1"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3.5 bg-gray-50/50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`p-1.5 rounded-full ${msg.sender === 'user' ? 'bg-[#0033cc]/10 text-[#0033cc]' : 'bg-gray-100 text-gray-600'}`}>
              {msg.sender === 'user' ? <FaUser size={10} /> : <FaRobot size={10} />}
            </div>
            
            <div className={`flex flex-col max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div 
                className={`px-3 py-2 rounded-2xl text-xs sm:text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#0033cc] text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-[9px] text-slate-650 mt-1 px-1 font-bold">
                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-full bg-gray-100 text-gray-600">
              <FaRobot size={10} />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-3.5 py-2 flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#0033cc] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#0033cc] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-[#0033cc] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && (
        <div className="px-3 py-2 bg-white border-t border-gray-100 overflow-x-auto flex gap-1.5 scrollbar-none whitespace-nowrap">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(sug)}
              className="text-[10px] sm:text-xs text-gray-600 hover:text-[#0033cc] bg-gray-100 hover:bg-[#0033cc]/5 border border-gray-200 hover:border-[#0033cc]/30 rounded-full px-3 py-1 transition-all"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleFormSubmit} className="p-2.5 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="यहाँ लिखें (जैसे: अपना नाम और फ़ोन नंबर)..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#0033cc] bg-gray-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-[#001a4d] hover:bg-[#0033cc] text-white p-2.5 rounded-full flex items-center justify-center disabled:bg-gray-200 transition-colors shadow-sm"
        >
          <FaPaperPlane size={12} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
