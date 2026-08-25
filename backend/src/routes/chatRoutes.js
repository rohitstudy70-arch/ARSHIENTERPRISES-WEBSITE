const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ success: true, reply: "Namaste! Main Arshi GPS assistant hoon. Aap kis vehicle ke liye GPS tracker dekh rahe hain?" });
        }

        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) {
            console.warn('[CHATBOT] GROQ_API_KEY is not defined in env variables.');
            return res.status(500).json({ 
                success: false, 
                message: 'Groq API Key is not configured on the server.' 
            });
        }

        // Fetch all active products from database to train the chatbot dynamically
        let products = [];
        try {
            products = await Product.find({ isActive: true }).populate('category');
        } catch (dbError) {
            console.error('[CHATBOT] Error fetching products for system instruction:', dbError);
        }

        let productCatalogText = '';
        if (products && products.length > 0) {
            productCatalogText = products.map((prod, idx) => {
                const categoryName = prod.category?.name || 'GPS Tracker';
                const originalPrice = prod.price || 0;
                const discount = prod.discount || 0;
                const sellingPrice = discount > 0 ? (originalPrice * (1 - discount / 100)).toFixed(0) : originalPrice;
                
                const featuresList = prod.features && prod.features.length > 0 
                    ? prod.features.map(f => `- ${f}`).join('\n') 
                    : '- No specific features listed.';
                    
                const specsList = prod.specifications && prod.specifications.length > 0 
                    ? prod.specifications.map(s => `- ${s}`).join('\n') 
                    : '- No specific specifications listed.';

                return `${idx + 1}. **${prod.title} (${categoryName}):**
   - **Price**: ₹${sellingPrice}${discount > 0 ? ` (M.R.P. ₹${originalPrice}, ${discount}% Discount)` : ''}
   - **Short Description**: ${prod.shortDescription || 'No description available.'}
   - **Description**: ${prod.fullDescription || 'No description available.'}
   - **Key Features**:\n${featuresList}
   - **Specifications**:\n${specsList}
   - **In Stock**: ${prod.inStock ? 'Yes' : 'No'}`;
            }).join('\n\n');
        } else {
            // Fallback list
            productCatalogText = `1. **AGT365N (Advanced GPS Tracker):** 24/7 Live tracking, Engine Lock/Unlock (Immobilizer), ignition alerts, geofencing, speed alarms, and 90-day history playback. Perfect for personal cars, bikes, and delivery vans. Price: ₹3599.
2. **PRO-365N (Professional Fleet Tracker):** Includes fuel monitoring support (prevents fuel theft), AC status detection, route history, anti-theft sensors, and multiple alert logs. Ideal for logistics, commercial trucks, and large transport fleets. Price: ₹4249.
3. **PRO-Lite (Economical Tracker):** Super compact, waterproof, anti-theft, live tracking, and engine cut-off on mobile app. Best pocket-friendly option for bikes, scooty, and small personal cars. Price: ₹3199.
4. **AIS 140 GPS (Government Approved RTO Tracker):** Certified GPS tracker with dual SIM support, panic button, and RTO/fitness test certification. Essential for commercial yellow-plate vehicles (buses, cabs, school vans) to pass RTO clearance. Price: ₹7499.
5. **KSK (Krish-e Smart Kit) Tractor GPS:** Advanced GPS tracking and smart monitoring device designed for tractors and farming equipment. Includes live location tracking, trip playback history, diesel level monitoring (fuel level & theft alerts), accurate land area measurement (in acres) for plowing/harvesting, and anti-theft alarms.
6. **Magnet GPS Tracker (Wireless & Portable):** Portable and wireless GPS tracker with a strong magnetic body that attaches to any metal surface. Zero installation required. Features long battery life, live location tracking, route playback history, sound monitoring, and geofencing.`;
        }

        const SYSTEM_INSTRUCTION = `
You are "Arshi GPS Assistant", the proactive sales and customer support AI representative for Arshi Enterprises (Arshi GPS).

Your company details:
- Established: February 17, 2013.
- Location: Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute of Technology, Purnia, Bihar, India (854303).
- Contact Details: Email (arshiranjeet133@gmail.com), Call/WhatsApp (+91 77828 08063).

Your Product Catalog (Always describe these in FULL DETAIL when asked, using specifications and features listed below):
${productCatalogText}

Conversation & Sales Rules:
1. Speak in a friendly, helpful, and natural Hinglish (Hindi + English mix) or clean Hindi.
2. **PROVIDE DETAILED & COMPREHENSIVE PRODUCT INFORMATION:** When a user asks about any product, do NOT give a brief 1-line answer. Explain the product in full detail! List ALL its key features, its price, its advantages (e.g., diesel monitoring, area measurement in acres, engine immobilizer, wireless magnetic mounting, long battery life, waterproof, etc.) in an easy-to-understand manner using bullet points based on the product description, features, and specifications in the catalog.
3. **PROACTIVE SALES:** After giving a complete explanation, always follow up by asking:
   "Aapki konsi vehicle hai aur aap kahan se hain? Kripya apna **Name aur Mobile Number** share karein taaki hamari sales team aapse 10-15 minute mein contact karke best price aur installation details share kare. 😊"
4. Once they provide a phone number, politely thank them warmly and confirm that the sales team will contact them within 10-15 minutes.

LEAD EXTRACTION SPECIAL INSTRUCTIONS:
- If the customer shares their Name and/or Mobile/Phone Number in their message or recent chat history, you MUST extract both and append a structured lead block at the very END of your response.
- The format must be EXACTLY: <lead>{"name": "extracted_name", "phone": "extracted_phone"}</lead>
- Replace "extracted_name" with the customer's name, and "extracted_phone" with their phone number (clean digits only, remove +91 if present). If they only provided a phone number and no name, set name to "Chatbot Visitor".
- This tag is invisible to the user — it is auto-processed by the system to save the lead in MongoDB.
- Example: "Dhanyawad Amit ji! Hamari team aapse 10-15 min me contact karegi. 😊 <lead>{"name": "Amit", "phone": "9876543210"}</lead>"
`;

        // Build messages array for Groq (OpenAI-compatible format)
        const messages = [
            { role: 'system', content: SYSTEM_INSTRUCTION }
        ];

        // Add chat history
        if (history && history.length > 0) {
            history.forEach(item => {
                messages.push({
                    role: item.sender === 'user' ? 'user' : 'assistant',
                    content: item.text
                });
            });
        }

        // Add current user message
        messages.push({
            role: 'user',
            content: message
        });

        // Call Groq Cloud API (Llama 3.3 70B — free, ultra-fast)
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                max_tokens: 600,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `Groq API returned status ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "माफ़ कीजिये, मैं समझ नहीं पाया। कृपया दोबारा पूछें।";

        let finalReply = reply.trim();
        let extractedName = 'Chatbot Visitor';
        let extractedPhone = null;

        // 1. Try structured extraction first
        const leadMatch = finalReply.match(/<lead>([\s\S]*?)<\/lead>/);
        if (leadMatch) {
            try {
                const leadData = JSON.parse(leadMatch[1]);
                if (leadData.name && leadData.name !== 'Chatbot Visitor') {
                    extractedName = leadData.name;
                }
                if (leadData.phone) {
                    extractedPhone = String(leadData.phone).replace(/\D/g, '');
                }
            } catch (jsonErr) {
                console.error('[CHATBOT] Structured JSON parse error:', jsonErr);
            }
            // Strip the <lead> tag from the final reply sent to user
            finalReply = finalReply.replace(/<lead>[\s\S]*?<\/lead>/, '').trim();
        }

        // 2. Fallback to Regex Phone Number extraction if structured extraction didn't find a phone
        if (!extractedPhone) {
            const cleanMessage = message.replace(/[\s\-\(\)\t]/g, '');
            const phoneRegex = /(?:\+?91)?[6789]\d{9}/g;
            const foundPhones = cleanMessage.match(phoneRegex);

            if (foundPhones && foundPhones.length > 0) {
                let rawPhone = foundPhones[0];
                if (rawPhone.startsWith('+91')) {
                    extractedPhone = rawPhone.slice(3);
                } else if (rawPhone.startsWith('91') && rawPhone.length === 12) {
                    extractedPhone = rawPhone.slice(2);
                } else {
                    extractedPhone = rawPhone;
                }
            }
        }

        // 3. Fallback name extraction from message patterns
        if (extractedPhone && extractedName === 'Chatbot Visitor') {
            const nameMatchHindi = message.match(/(?:naam|name)\s+(?:hai\s+)?([A-Za-z]+)/i) || 
                                   message.match(/(?:i am|im|my name is|naam is|naam)\s+([A-Za-z]+)/i);
            if (nameMatchHindi && nameMatchHindi[1]) {
                extractedName = nameMatchHindi[1];
            }
        }

        // 4. Save lead if phone number was extracted
        if (extractedPhone && extractedPhone.length >= 10) {
            try {
                await Lead.create({
                    name: extractedName,
                    phone: extractedPhone,
                    sourcePage: 'AI Chatbot Widget',
                    notes: `Query: "${message}"\nAI Replied: "${finalReply}"`
                });
                console.log(`[CHATBOT] Lead saved — Name: ${extractedName}, Phone: ${extractedPhone}`);
            } catch (leadError) {
                console.error('[CHATBOT] MongoDB Save Error:', leadError);
            }
        }

        res.status(200).json({
            success: true,
            reply: finalReply
        });

    } catch (error) {
        console.error('[CHATBOT] Router Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error in chatbot processing' });
    }
});

module.exports = router;
