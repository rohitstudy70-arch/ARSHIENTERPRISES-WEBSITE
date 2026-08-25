import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, BUSINESS } from '../config/environment';
import { FaPaperPlane, FaTimes, FaCommentDots, FaRobot, FaUser } from 'react-icons/fa';

const getLocalBotReply = (userText) => {
  const lower = userText.toLowerCase();

  // Language Detection: Check if query is in English
  const isEnglishQuery = () => {
    // Common Hindi/Hinglish words
    const hindiWords = [
      'hai', 'kya', 'daam', 'batao', 'kaise', 'karo', 'hoga', 'naam', 'kripya', 
      'dhanyawad', 'mera', 'par', 'hoon', 'tha', 'yaar', 'ji', 'aap', 'se', 'ko', 
      'mein', 'me', 'ki', 'bhejo', 'dikhao', 'chahiye', 'hai'
    ];
    for (const word of hindiWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(lower)) {
        return false;
      }
    }
    // Otherwise, check for English markers
    const englishWords = [
      'price', 'cost', 'detail', 'details', 'show', 'tell', 'give', 'please', 
      'thank', 'thanks', 'info', 'information', 'about', 'product', 'features', 
      'specifications', 'specs', 'what', 'how', 'where', 'who', 'buy', 'need', 
      'want', 'tracker', 'gps', 'vehicle', 'car', 'bike', 'tractor', 'magnet', 'wireless'
    ];
    for (const word of englishWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(lower)) {
        return true;
      }
    }
    return true; // Default to English if no clear Hindi matches
  };

  const isEnglish = isEnglishQuery();

  // 1. Detect any 10-digit mobile number in the user message for lead capturing
  const numberGroups = userText.match(/\+?[0-9]+/g) || [];
  let phone = null;
  for (const group of numberGroups) {
    const cleanGroup = group.replace(/\D/g, '');
    if (cleanGroup.length === 10 && /[6-9]/.test(cleanGroup[0])) {
      phone = cleanGroup;
      break;
    } else if (cleanGroup.length === 12 && cleanGroup.startsWith('91') && /[6-9]/.test(cleanGroup[2])) {
      phone = cleanGroup.slice(2);
      break;
    }
  }

  if (phone) {
    // Extract name
    let name = 'Chatbot Visitor';
    const nameMatch = userText.match(/(?:naam|name|im|i am|my name is|naam is|this is)\s+([A-Za-z\s]{2,20})/i);
    if (nameMatch && nameMatch[1]) {
      name = nameMatch[1].trim();
    } else {
      // Split by phone/mobile keyword to extract whatever text came before it
      const parts = userText.split(/(?:mobile|phone|no|num|number|no\s+is|contact|digit)/i);
      if (parts[0] && parts[0].trim().length >= 2) {
        name = parts[0].replace(/[^A-Za-z\s]/g, '').trim() || 'Chatbot Visitor';
      }
    }

    // Save locally to localStorage leads database
    try {
      const leads = JSON.parse(localStorage.getItem('arshi_leads') || '[]');
      leads.unshift({
        _id: 'lead_' + Date.now(),
        name,
        phone,
        status: 'New',
        sourcePage: 'Chatbot Widget (Offline Lead Match)',
        notes: `Captured from message: "${userText}"`,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('arshi_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Error saving local lead:', e);
    }

    // Asynchronously try to capture on the backend
    axios.post(`${API_BASE_URL}/leads/capture`, {
      name,
      phone,
      sourcePage: 'Chatbot Widget (Offline Lead Match)',
      notes: `Captured from message: "${userText}"`
    }).catch(err => console.warn('Could not post lead to server, saved locally', err));

    if (isEnglish) {
      return `Thank you **${name}**! Your details have been registered successfully (Mobile: ${phone}). Our sales team will contact you via callback within 10-15 minutes. 😊`;
    } else {
      return `Dhanyawad **${name}** ji! Aapki details register ho gayi hain (Mobile: ${phone}). Hamaari sales team aapse 10-15 minute mein call back ke zariye contact karegi. 😊`;
    }
  }

  // Try to load products from localStorage
  let products = [];
  try {
    const stored = localStorage.getItem('arshi_products');
    if (stored) products = JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing localStorage products', e);
  }

  // Fallback mocks if localStorage empty
  if (products.length === 0) {
    products = [
      {
        title: 'Arshi AGT365N Premium GPS Tracker',
        shortDescription: 'Smart GPS tracker with real-time tracking, engine cut-off, instant alerts, and 1-year history playback. Optimized for luxury cars and bikes.',
        price: 4499,
        discount: 20,
        features: ['Engine Lock (Ignition Control)', 'Anti-Theft Alarm', 'Geofence Notifications', 'Over-speeding Alerts', 'Built-in Backup Battery']
      },
      {
        title: 'Arshi PRO-365N Lite Hybrid GPS Tracker',
        shortDescription: 'Combining the mini, concealable design of PRO-Lite with the advanced fleet diagnostics intelligence of PRO-365N. High-performance engine lock and analytics support.',
        price: 4999,
        discount: 15,
        features: ['Discreet Hidden Design', 'Engine Lock (Ignition Control)', 'Advanced Fleet Diagnostics', 'Smart Sleep Mode', 'Real-time GPS Tracking']
      },
      {
        title: 'Arshi Portable Magnetic GPS Asset Tracker',
        shortDescription: 'Wireless portable GPS tracker with strong industrial magnets and a high-capacity rechargeable battery. Ideal for assets, cargo, and hidden placement.',
        price: 5499,
        discount: 10,
        features: ['Strong Industrial Magnets', '10,000mAh Rechargeable Battery', 'No Wiring Required', 'Tamper Sensor Alerts']
      },
      {
        title: 'Arshi AIS 140 CDAC Certified Tracker',
        shortDescription: 'Government-approved AIS 140 GPS tracker mandatory for commercial vehicles, taxis, and school buses. CDAC and ARAI certified with double SIM.',
        price: 9999,
        discount: 25,
        features: ['CDAC & ARAI Certified compliant', 'Dual IP Address Support', 'Emergency Panic Button (SOS)', 'Dual SIM (eSIM) multi-network']
      }
    ];
  }

  // Find matching product
  let matched = null;
  for (const p of products) {
    const title = p.title.toLowerCase();
    if (
      (title.includes('magnet') && lower.includes('magnet')) ||
      (title.includes('tractor') && lower.includes('tractor')) ||
      (title.includes('agt365n') && lower.includes('agt365n')) ||
      (title.includes('pro-365n') && lower.includes('pro-365n')) ||
      (title.includes('lite') && lower.includes('lite')) ||
      (title.includes('ais 140') && lower.includes('ais 140')) ||
      (title.includes('ais140') && lower.includes('ais140'))
    ) {
      matched = p;
      break;
    }
  }

  if (!matched) {
    // Check general matches
    if (lower.includes('magnet')) {
      matched = products.find(p => p.title.toLowerCase().includes('magnet'));
    } else if (lower.includes('tractor') || lower.includes('ksk')) {
      matched = products.find(p => p.title.toLowerCase().includes('tractor') || p.title.toLowerCase().includes('ksk'));
    } else if (lower.includes('agt365n') || lower.includes('365n')) {
      matched = products.find(p => p.title.toLowerCase().includes('agt365n'));
    } else if (lower.includes('lite')) {
      matched = products.find(p => p.title.toLowerCase().includes('lite'));
    } else if (lower.includes('ais')) {
      matched = products.find(p => p.title.toLowerCase().includes('ais'));
    }
  }

  if (matched) {
    const originalPrice = matched.price || 0;
    const discount = matched.discount || 0;
    const sellingPrice = discount > 0 ? (originalPrice * (1 - discount / 100)).toFixed(0) : originalPrice;
    const featuresList = matched.features && matched.features.length > 0
      ? matched.features.map(f => `• ${f}`).join('\n')
      : '';

    if (isEnglish) {
      return `You asked about **${matched.title}**. Here are the details:

📝 **Description**: ${matched.shortDescription || matched.fullDescription || ''}

💰 **Price**: ₹${sellingPrice} ${discount > 0 ? `(M.R.P. ₹${originalPrice}, ${discount}% Discount)` : ''}
${featuresList ? `\n🛠️ **Key Features**:\n${featuresList}` : ''}

What vehicle do you have and where are you located? Please share your **Name and exactly 10-digit Mobile Number** here in the chat so our team can contact you to share best offers! 😊`;
    } else {
      return `Aapne **${matched.title}** ke baare mein poocha. Iski details ye hain:

📝 **Description**: ${matched.shortDescription || matched.fullDescription || ''}

💰 **Price**: ₹${sellingPrice} ${discount > 0 ? `(M.R.P. ₹${originalPrice}, ${discount}% Discount)` : ''}
${featuresList ? `\n🛠️ **Key Features**:\n${featuresList}` : ''}

Aapki konsi vehicle hai aur aap kahan se hain? Kripya apna **Name aur exactly 10-digit Mobile Number** yahan reply me share karein taaki hamari team aapse details share karne ke liye call back bhej sake! 😊`;
    }
  }

  if (lower.includes('price') || lower.includes('daam') || lower.includes('rate') || lower.includes('cost')) {
    if (isEnglish) {
      return `We offer different types of GPS trackers:
1. **AGT365N (Premium Cars/Bikes)**: ₹3,599 (With engine lock/unlock alert features)
2. **PRO-365N (Fleet Fuel Tracker)**: ₹4,249 (With diesel monitoring and AC status detection)
3. **PRO-Lite (Pocket Friendly)**: ₹3,199 (Mini hidden size for scooty/bikes)
4. **Magnet GPS Tracker (Wireless)**: ₹4,949 (Strong industrial magnets, zero wiring)
5. **AIS 140 GPS (Govt Approved)**: ₹7,499 (Fitness compliant with certificate upload)

Which vehicle tracker are you looking for? Please share your contact details so our sales team can share pricing.`;
    } else {
      return `Hamare paas alag-alag type ke GPS trackers hain:
1. **AGT365N (Premium Cars/Bikes)**: ₹3,599 (Engine lock/unlock alerts features ke saath)
2. **PRO-365N (Fleet Fuel Tracker)**: ₹4,249 (Diesel monitoring aur AC status ke saath)
3. **PRO-Lite (Pocket Friendly)**: ₹3,199 (Mini hidden size for scooty/bikes)
4. **Magnet GPS Tracker (Wireless)**: ₹4,949 (Strong industrial magnets, zero wiring)
5. **AIS 140 GPS (Govt Approved)**: ₹7,499 (Fitness clearance certificate ke saath)

Aapko kis vehicle ke liye tracker chahiye? Apna contact details share kijiye taaki sales team clear pricing details bhej sake.`;
    }
  }

  // Fallback for general questions: directly ask for their name and exactly a 10-digit mobile number to schedule contact
  if (isEnglish) {
    return `Hello! I can register your query and callback request.

Please share your **Name and exactly 10-digit Mobile Number** here in the chat, so our support team can contact you directly to answer your questions! 😊`;
  } else {
    return `Namaste! Main aapki query aur call back request register kar sakta hoon.

Kripya apna **Name aur exactly 10-digit Mobile Number** yahan reply karein, taaki hamaari support team aapse contact kar ke iska detailed answer de sake! 😊`;
  }
};

export const ChatbotWidget = () => {
  const [open, setOpen] = useState(true); // Open by default
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! 🙏 Arshi GPS mein aapka swagat hai!\nMain aapka GPS Assistant hoon.\n\nAap vehicle trackers (AGT365N, PRO-365N, PRO-Lite, KSK Tractor GPS, Magnet GPS) ya pricing ke baare mein pooch sakte hain.\n\nApna Name aur Mobile Number share karein — hamaari team 10-15 min mein contact karegi! 😊',
      time: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Offline Fallback States
  const [isOffline, setIsOffline] = useState(false);
  const [offlineName, setOfflineName] = useState('');
  const [offlinePhone, setOfflinePhone] = useState('');
  const [fallbackSubmitted, setFallbackSubmitted] = useState(false);
  const [submittingFallback, setSubmittingFallback] = useState(false);

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
      // Send message to Express backend /api/v1/chat endpoint
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
      console.error('AI Chatbot error:', error);
      setIsOffline(true);
      const localReply = getLocalBotReply(userMessage.text);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: localReply,
        time: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    if (!offlinePhone.trim()) return;

    setSubmittingFallback(true);
    try {
      await axios.post(`${API_BASE_URL}/leads/capture`, {
        name: offlineName.trim() || 'Chatbot Offline Lead',
        phone: offlinePhone.trim(),
        sourcePage: 'Chatbot Widget (Offline Fallback)',
        notes: `Captured during chatbot connection delay/timeout.`
      });
      setFallbackSubmitted(true);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `Dhanyawad ${offlineName ? offlineName : 'Visitor'}! Aapka request direct receive ho gaya hai. Hamari team aapse 10-15 minute me contact karegi.`,
        time: new Date()
      }]);
    } catch (err) {
      console.error('Offline lead capture error:', err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Something went wrong saving details. Please call us directly at +91 77828 08063.',
        time: new Date()
      }]);
    } finally {
      setSubmittingFallback(false);
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
    'Magnet GPS Details?',
    'KSK Tractor GPS Details?',
    'AGT365N GPS Price?',
    'Callback schedule kariye'
  ];

  // Collapsed View (Pulsing badge)
  if (!open) {
    return (
      <button 
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 md:right-6 z-50 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce focus:outline-none"
        title="Open Support Chat"
        aria-label="Open Support Chat"
      >
        <FaCommentDots size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[300px] sm:w-96 h-[400px] sm:h-[460px] flex flex-col bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden font-sans transition-all duration-300">
      
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 p-1.5 rounded-full">
            <FaRobot className="text-md text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">Arshi GPS AI Support</h3>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] text-sky-200">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setOpen(false)}
            className="text-sky-200 hover:text-white p-1"
            aria-label="Close Chat"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* Message Screen */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-gray-50/50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`p-1 rounded-full ${msg.sender === 'user' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
              {msg.sender === 'user' ? <FaUser size={10} /> : <FaRobot size={10} />}
            </div>
            
            <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div 
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-200/50 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-[9px] text-slate-600 mt-0.5 px-1 font-bold">
                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-gray-100 text-gray-500">
              <FaRobot size={10} />
            </div>
            <div className="bg-white border border-gray-100 rounded-xl rounded-tl-none px-3 py-2 flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && (
        <div className="px-2 py-1.5 bg-white border-t border-gray-100 overflow-x-auto flex gap-1 scrollbar-none whitespace-nowrap">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(sug)}
              className="text-[10px] text-gray-600 hover:text-primary bg-gray-100 hover:bg-primary/5 border border-gray-200 rounded-full px-2.5 py-1 transition-all"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Send Input Panel */}
      <form onSubmit={handleFormSubmit} className="p-2 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 border border-gray-200 rounded-full px-3.5 py-1.5 text-xs sm:text-sm focus:outline-none focus:border-primary bg-gray-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-primary hover:bg-opacity-95 text-white p-2 rounded-full flex items-center justify-center disabled:bg-gray-200 transition-colors"
          aria-label="Send Message"
        >
          <FaPaperPlane size={12} />
        </button>
      </form>
    </div>
  );
};

export default ChatbotWidget;
