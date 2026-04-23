import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { getSheetData } from '../services/googleSheets';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sources?: string[];
}

interface PopiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PopiChatbot = ({ isOpen, onClose }: PopiChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [tiendas, setTiendas] = useState<any[]>([]);
  const [marcas, setMarcas] = useState<any[]>([]);

  // Cargar datos de Google Sheets al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const [restData, tiendasData, marcasData] = await Promise.all([
          getSheetData('Restaurantes'),
          getSheetData('Tiendas'),
          getSheetData('Marcas')
        ]);
        
        setRestaurantes(restData.slice(1) || []);
        setTiendas(tiendasData.slice(1) || []);
        setMarcas(marcasData.slice(1) || []);
      } catch (error) {
        console.error('Error loading data for chatbot:', error);
      }
    };

    if (isOpen) {
      loadData();
      
      // Mensaje de bienvenida
      const welcomeMessage: Message = {
        id: '1',
        text: '¡Hola! Soy Popi, tu asistente celíaco 🌱. Puedo ayudarte a encontrar restaurantes seguros, tiendas especializadas y productos sin gluten. ¿En qué puedo ayudarte?',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const searchInDatabase = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = {
      restaurantes: restaurantes.filter(r => 
        r[0]?.toLowerCase().includes(lowerQuery) || 
        r[1]?.toLowerCase().includes(lowerQuery) ||
        r[2]?.toLowerCase().includes(lowerQuery)
      ),
      tiendas: tiendas.filter(t => 
        t[0]?.toLowerCase().includes(lowerQuery) || 
        t[1]?.toLowerCase().includes(lowerQuery) ||
        t[2]?.toLowerCase().includes(lowerQuery)
      ),
      marcas: marcas.filter(m => 
        m[0]?.toLowerCase().includes(lowerQuery) || 
        m[1]?.toLowerCase().includes(lowerQuery)
      )
    };
    return results;
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      // Primero buscar en nuestra base de datos
      const dbResults = searchInDatabase(userMessage);
      
      let response = '';
      const sources: string[] = [];

      // Si encontramos resultados en la base de datos
      if (dbResults.restaurantes.length > 0 || dbResults.tiendas.length > 0 || dbResults.marcas.length > 0) {
        response = '🔍 **He encontrado información en nuestra base de datos CeliGO:**\n\n';
        
        if (dbResults.restaurantes.length > 0) {
          response += '🍽️ **Restaurantes:**\n';
          dbResults.restaurantes.slice(0, 3).forEach((rest, index) => {
            const isValid = rest[3] === 'TRUE';
            const status = isValid ? '✅ Certificado sin gluten' : '⚠️ Requiere precaución';
            response += `${index + 1}. **${rest[0]}** - ${rest[2]}\n   📍 ${rest[1]}\n   ${status}\n\n`;
          });
          sources.push('Base de datos CeliGO - Restaurantes');
        }

        if (dbResults.tiendas.length > 0) {
          response += '🛒 **Tiendas:**\n';
          dbResults.tiendas.slice(0, 3).forEach((tienda, index) => {
            response += `${index + 1}. **${tienda[0]}** - ${tienda[2]}\n   📍 ${tienda[1]}\n   🕒 ${tienda[3]}\n\n`;
          });
          sources.push('Base de datos CeliGO - Tiendas');
        }

        if (dbResults.marcas.length > 0) {
          response += '🏷️ **Marcas/Productos:**\n';
          dbResults.marcas.slice(0, 3).forEach((marca, index) => {
            const hasTrazas = marca[3] === 'SÍ' || marca[3] === 'SI';
            const status = hasTrazas ? '⚠️ Posibles trazas' : '✅ Sin gluten certificado';
            response += `${index + 1}. **${marca[0]}** - ${marca[1]}\n   ${status}\n\n`;
          });
          sources.push('Base de datos CeliGO - Marcas');
        }
      } else {
        // Si no hay resultados en la BD, usar Gemini para buscar en tiempo real
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const model = ai.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Actúa como un experto en celiaquía y seguridad alimentaria. El usuario pregunta: "${userMessage}". 
        
        Responde de forma clara y concisa, enfocándote en:
        1. Seguridad para celíacos
        2. Opciones sin gluten disponibles
        3. Precauciones a tomar
        4. Alternativas seguras
        
        Si la pregunta es sobre un restaurante específico, menciona siempre que se recomienda verificar directamente con el establecimiento sobre sus protocolos sin gluten.
        
        Responde en español y de forma amigable.`;

        const result = await model.generateContent(prompt);
        response = result.response.text();
        sources.push('Búsqueda en tiempo real - Gemini AI');
      }

      return response;

    } catch (error) {
      console.error('Error generating response:', error);
      return 'Lo siento, he tenido un problema al procesar tu pregunta. Por favor, intenta reformularla o contacta con soporte.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await generateResponse(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        sources: ['Base de datos CeliGO', 'Gemini AI']
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, no he podido procesar tu mensaje en este momento. Por favor, intenta más tarde.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-lg bg-surface-highest rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-on-primary" />
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Popi</h3>
                <p className="text-xs text-on-surface-variant">Tu asistente celíaco</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-on-surface-variant" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-on-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-primary text-on-primary' 
                    : 'bg-surface-container text-on-surface'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  
                  {message.sources && (
                    <div className="mt-2 pt-2 border-t border-outline-variant/20">
                      <p className="text-xs opacity-70">Fuentes: {message.sources.join(', ')}</p>
                    </div>
                  )}
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-on-secondary" />
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-on-primary" />
                </div>
                <div className="bg-surface-container p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-outline-variant/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pregunta a Popi..."
                className="flex-1 px-4 py-3 bg-surface-container rounded-full border border-outline-variant/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};