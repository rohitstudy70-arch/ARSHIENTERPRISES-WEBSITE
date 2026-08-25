import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  FaRobot, 
  FaPaperPlane, 
  FaPlus, 
  FaTrash, 
  FaUser, 
  FaCog, 
  FaSignOutAlt, 
  FaPaperclip, 
  FaImage, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaSlidersH, 
  FaTimes 
} from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5001/api';

function App() {
  // Auth state
  const [password, setPassword] = useState(localStorage.getItem('chat_pwd') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginInput, setLoginInput] = useState('');

  // Chat sessions state (loaded from local storage)
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Input states
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Settings states (for active chat session)
  const [showSettings, setShowSettings] = useState(false);
  const [systemInstruction, setSystemInstruction] = useState('');
  const [temperature, setTemperature] = useState(0.7);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // 1. Verify Authentication on load
  useEffect(() => {
    if (password) {
      verifyPassword(password);
    }
  }, []);

  // 2. Load Chat History when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const savedChats = localStorage.getItem('arshi_chats');
      if (savedChats) {
        try {
          const parsed = JSON.parse(savedChats);
          setChats(parsed);
          if (parsed.length > 0) {
            setActiveChatId(parsed[0].id);
          } else {
            createNewChat();
          }
        } catch (e) {
          console.error('Error loading chats', e);
          createNewChat();
        }
      } else {
        createNewChat();
      }
    }
  }, [isAuthenticated]);

  // 3. Save Chat History on changes
  useEffect(() => {
    if (isAuthenticated && chats.length > 0) {
      localStorage.setItem('arshi_chats', JSON.stringify(chats));
    }
  }, [chats, isAuthenticated]);

  // 4. Update local settings state when active chat changes
  useEffect(() => {
    const activeChat = chats.find(c => c.id === activeChatId);
    if (activeChat) {
      setSystemInstruction(activeChat.systemInstruction || 'You are a helpful and intelligent AI personal assistant.');
      setTemperature(activeChat.temperature || 0.7);
    }
  }, [activeChatId]);

  // Scroll to bottom helper
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChatId, loading]);

  const verifyPassword = async (pwd) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, { password: pwd });
      if (res.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('chat_pwd', pwd);
        setPassword(pwd);
        setLoginError('');
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Connection error. Make sure the backend server is running.');
      setIsAuthenticated(false);
      localStorage.removeItem('chat_pwd');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    verifyPassword(loginInput);
  };

  const handleLogout = () => {
    localStorage.removeItem('chat_pwd');
    setPassword('');
    setIsAuthenticated(false);
  };

  const createNewChat = (customPrompt = '', title = '') => {
    const newChat = {
      id: Date.now().toString(),
      title: title || `New Discussion ${chats.length + 1}`,
      systemInstruction: customPrompt || 'You are a helpful and intelligent AI personal assistant.',
      temperature: 0.7,
      messages: [
        {
          sender: 'bot',
          text: 'Hello! I am your personal AI Assistant. How can I help you today?',
          time: new Date()
        }
      ]
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id, e) => {
    e.stopPropagation();
    const filtered = chats.filter(c => c.id !== id);
    setChats(filtered);
    if (filtered.length > 0) {
      if (activeChatId === id) {
        setActiveChatId(filtered[0].id);
      }
    } else {
      createNewChat();
    }
  };

  const clearAllChats = () => {
    if (window.confirm('Are you sure you want to delete all chat history?')) {
      setChats([]);
      localStorage.removeItem('arshi_chats');
      createNewChat();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPEG, PNG, WEBP).');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    const currentChat = chats.find(c => c.id === activeChatId);
    if (!currentChat) return;

    // 1. Create User Message Object
    const userMessage = {
      sender: 'user',
      text: inputText,
      time: new Date()
    };

    if (filePreview) {
      userMessage.filePreview = filePreview;
    }

    // 2. Append immediately to local chat state
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage]
        };
      }
      return chat;
    });
    setChats(updatedChats);

    // Reset input fields
    const sentText = inputText;
    const sentFile = selectedFile;
    setInputText('');
    removeSelectedFile();
    setLoading(true);

    try {
      // 3. Construct multipart payload
      const formData = new FormData();
      formData.append('password', password);
      formData.append('message', sentText);
      formData.append('systemInstruction', systemInstruction);
      formData.append('temperature', temperature);

      // Filter history for API (last 6 messages to keep it fast & cheap)
      const historyForApi = currentChat.messages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.text
      }));
      formData.append('history', JSON.stringify(historyForApi));

      if (sentFile) {
        formData.append('file', sentFile);
      }

      // 4. Send request to backend
      const res = await axios.post(`${API_BASE_URL}/chat`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 5. Append AI reply
      const botMessage = {
        sender: 'bot',
        text: res.data.reply,
        time: new Date()
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          // Auto-rename chat title based on first query if generic
          let newTitle = chat.title;
          if (chat.title.startsWith('New Discussion')) {
            newTitle = sentText.slice(0, 25) + (sentText.length > 25 ? '...' : '');
          }
          return {
            ...chat,
            title: newTitle,
            messages: [...chat.messages, botMessage]
          };
        }
        return chat;
      }));

    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Error communicating with AI. Make sure your Gemini API key is active and backend is running.';
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, { sender: 'bot', text: `⚠️ Error: ${errMsg}`, time: new Date() }]
          };
        }
        return chat;
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = () => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          systemInstruction: systemInstruction,
          temperature: temperature
        };
      }
      return chat;
    }));
    setShowSettings(false);
  };

  // Helper to load presets
  const applyPreset = (presetText, title) => {
    createNewChat(presetText, title);
  };

  // Current active chat messages
  const activeChat = chats.find(c => c.id === activeChatId);
  const activeMessages = activeChat ? activeChat.messages : [];

  // --- RENDERING ---

  // Auth Guard Screen
  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-4 p-8 rounded-2xl glass-card text-center animate-float">
        <div className="inline-block p-4 bg-indigo-600/20 rounded-full mb-4 border border-indigo-500/20">
          <FaRobot size={48} className="text-indigo-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">AI Companion Studio</h1>
        <p className="text-gray-400 text-sm mb-6">Enter your administrator access key to begin chatting.</p>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Security Password..."
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full px-5 py-3 rounded-xl glass-input text-center text-lg placeholder-gray-500"
              required
            />
          </div>

          {loginError && (
            <div className="flex items-center justify-center gap-2 text-red-400 text-xs py-2 bg-red-900/20 border border-red-500/20 rounded-lg">
              <FaExclamationCircle />
              <span>{loginError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white transition-all duration-300 shadow-lg shadow-indigo-600/30 glow-btn"
          >
            Authenticate & Start
          </button>
        </form>
        <p className="text-gray-600 text-[10px] mt-6">Secure Single-User Desktop Client Node Port 5001</p>
      </div>
    );
  }

  // Dashboard Main Screen
  return (
    <div className="w-full h-screen flex bg-slate-950/80 glass-panel overflow-hidden">
      
      {/* 1. Left Sidebar (History & Preset Panel) */}
      <div className="w-64 md:w-80 h-full border-r border-white/5 flex flex-col bg-slate-900/60 backdrop-blur-md">
        
        {/* App Title */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaRobot className="text-2xl text-indigo-400" />
            <h2 className="font-extrabold text-lg text-white tracking-wide">AI Studio</h2>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-glow"></span>
        </div>

        {/* New Chat Action */}
        <div className="p-4">
          <button
            onClick={() => createNewChat()}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/30"
          >
            <FaPlus size={12} />
            <span>New Chatroom</span>
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-500 px-2 tracking-wider mb-2">Previous Chats</div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                chat.id === activeChatId 
                  ? 'bg-indigo-600/15 border border-indigo-500/30 text-white' 
                  : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={`w-1.5 h-1.5 rounded-full ${chat.id === activeChatId ? 'bg-indigo-400' : 'bg-slate-700'}`}></span>
                <span className="text-sm font-medium truncate">{chat.title}</span>
              </div>
              <button
                onClick={(e) => deleteChat(chat.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-1 transition-all"
                title="Delete Chat"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2 bg-slate-950/40">
          <button
            onClick={clearAllChats}
            className="w-full py-2.5 rounded-xl border border-red-500/20 text-red-400/80 hover:text-red-400 hover:bg-red-950/20 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <FaTrash size={10} />
            <span>Clear Workspace</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-white/5"
          >
            <FaSignOutAlt size={10} />
            <span>Sign Out Control</span>
          </button>
        </div>
      </div>

      {/* 2. Main Chat Panel */}
      <div className="flex-1 h-full flex flex-col relative bg-slate-950/40">
        
        {/* Chat Area Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-900/20 backdrop-blur-sm">
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              {activeChat ? activeChat.title : 'Chatbot Session'}
            </h1>
            <p className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1 mt-0.5">
              <FaCheckCircle size={9} />
              <span>Model: Google Gemini 1.5 Flash</span>
            </p>
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
              showSettings 
                ? 'bg-indigo-600 border-indigo-500 text-white' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FaSlidersH />
            <span className="text-xs font-bold hidden md:inline">Tune AI</span>
          </button>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/10">
          
          {/* Prompt Presets Showcase (Only visible when starting a fresh chat) */}
          {activeMessages.length === 1 && (
            <div className="max-w-2xl mx-auto py-8">
              <h2 className="text-xl font-bold text-slate-300 mb-2 text-center">Prompt Presets Library</h2>
              <p className="text-slate-500 text-xs text-center mb-6">Choose a predefined behavior profile to launch a tailored chatroom context.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div 
                  onClick={() => applyPreset("Act as a senior full-stack developer. Write modular, clean, and error-free code templates. Focus on clean architecture.", "💻 Software Engineer")}
                  className="p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/30 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <h3 className="font-bold text-white text-sm">💻 Software Engineer</h3>
                  <p className="text-slate-400 text-xs mt-1">Explains code patterns, finds bugs, and designs secure APIs.</p>
                </div>
                <div 
                  onClick={() => applyPreset("Act as a professional copywriter. Write highly engaging, SEO-rich blog articles, social hooks, and promotional content.", "✍️ Creative Copywriter")}
                  className="p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/30 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <h3 className="font-bold text-white text-sm">✍️ Creative Copywriter</h3>
                  <p className="text-slate-400 text-xs mt-1">Generates emails, article outlines, and social media captions.</p>
                </div>
                <div 
                  onClick={() => applyPreset("Act as an expert English language trainer. If I write mistakes, correct them. Help expand my vocabulary.", "🎓 English Coach")}
                  className="p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/30 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <h3 className="font-bold text-white text-sm">🎓 English Coach</h3>
                  <p className="text-slate-400 text-xs mt-1">Vocabulary building, grammatical audits, and text polish.</p>
                </div>
                <div 
                  onClick={() => applyPreset("Act as a wise, friendly, and logical philosophical counselor. Use analogies and logical models to discuss ideas.", "🧘 Philosophy Advisor")}
                  className="p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/30 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <h3 className="font-bold text-white text-sm">🧘 Philosophy Advisor</h3>
                  <p className="text-slate-400 text-xs mt-1">Debate concepts, structure mental clarity, and explore logic.</p>
                </div>
              </div>
            </div>
          )}

          {/* Actual Chat Messages */}
          {activeMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Profile Icon */}
              <div className={`p-2.5 rounded-xl border ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600/20 border-indigo-500/20 text-indigo-400' 
                  : 'bg-slate-800/60 border-slate-700/40 text-slate-300'
              }`}>
                {msg.sender === 'user' ? <FaUser size={14} /> : <FaRobot size={14} />}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col max-w-[70%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Uploaded File Preview in Bubble */}
                {msg.filePreview && (
                  <div className="mb-2 max-w-xs rounded-xl overflow-hidden border border-white/10">
                    <img src={msg.filePreview} alt="Attached Context" className="w-full h-auto object-contain" />
                  </div>
                )}

                <div className={`px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'message-user text-white' 
                    : 'message-bot text-slate-100'
                }`}>
                  <p className="white-space-pre-wrap">{msg.text}</p>
                </div>

                {/* Timestamp */}
                <span className="text-[9px] text-slate-500 mt-1 px-1">
                  {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl border bg-slate-800/60 border-slate-700/40 text-slate-300">
                <FaRobot size={14} />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-800/40 border border-white/5 text-slate-400 flex items-center gap-1.5 shadow-sm">
                <span className="shimmer-text font-semibold text-xs">AI Agent is crafting response</span>
                <div className="flex gap-1 items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Floating Upload Context Preview bar above input */}
        {filePreview && (
          <div className="absolute bottom-24 left-6 right-6 p-3 rounded-xl border border-white/5 bg-slate-900/90 backdrop-blur-md flex items-center justify-between shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3">
              <img src={filePreview} alt="upload preview" className="w-12 h-12 object-cover rounded-lg border border-white/10" />
              <div>
                <p className="text-xs font-bold text-white">Multimodal context active</p>
                <p className="text-[10px] text-slate-400">Gemini Flash will read this image</p>
              </div>
            </div>
            <button 
              onClick={removeSelectedFile} 
              className="p-1.5 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-colors"
            >
              <FaTimes size={12} />
            </button>
          </div>
        )}

        {/* Input Formulation Bar */}
        <div className="p-6 border-t border-white/5 bg-slate-900/10">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3">
            
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload trigger button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 text-slate-400 hover:text-white rounded-xl transition-all shadow-md"
              title="Upload Image (Multimodal)"
            >
              <FaImage size={18} />
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={selectedFile ? "Ask a question about this image..." : "Draft a query to Gemini Assistant..."}
              className="flex-1 px-5 py-3 rounded-xl glass-input placeholder-slate-500 text-sm shadow-md"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={(!inputText.trim() && !selectedFile) || loading}
              className="p-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl shadow-lg shadow-indigo-600/15 disabled:shadow-none transition-all flex items-center justify-center"
            >
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Right Slide-In Configuration Panel (Tune AI Settings) */}
      {showSettings && (
        <div className="w-80 h-full border-l border-white/5 bg-slate-900/90 backdrop-blur-md p-6 flex flex-col shadow-2xl animate-slide-in">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <h2 className="font-extrabold text-white text-md flex items-center gap-2">
              <FaCog className="text-indigo-400 animate-spin-slow" />
              <span>Session Tuning</span>
            </h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-1">
            {/* System Instruction text block */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FaRobot />
                <span>AI Agent Prompt Personality</span>
              </label>
              <textarea
                value={systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value)}
                placeholder="Give the AI a character, system role, style instructions, constraints..."
                className="w-full h-40 p-3 rounded-xl glass-input text-xs resize-none placeholder-slate-600 leading-normal"
              />
              <p className="text-[9px] text-slate-500 leading-normal">
                This instructions object is sent along with each prompt to set the AI's core behavior context.
              </p>
            </div>

            {/* Temperature slide */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Model Temperature
                </label>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-900/30 px-2 py-0.5 rounded-md">
                  {temperature}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase">
                <span>Precise / Logical</span>
                <span>Creative / Random</span>
              </div>
            </div>
            
            {/* Diagnostic panel */}
            <div className="p-4 rounded-xl border border-white/5 bg-slate-950/50 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FaInfoCircle size={10} className="text-indigo-400" />
                <span>Local Diagnostics</span>
              </h4>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">API Status:</span>
                <span className="text-green-400 font-semibold">Active OK</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Session Memory:</span>
                <span className="text-indigo-400 font-bold">{activeMessages.length} Messages</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-6">
            <button
              onClick={handleSaveSettings}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-indigo-600/10"
            >
              Apply Active Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
