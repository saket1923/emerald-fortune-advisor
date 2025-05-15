
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot = ({ onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello Alex! I'm your personal financial advisor. How can I help you today?", 
      sender: "bot" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // The API key for Gemini
  const API_KEY = "AIzaSyA8qpo5B26cchXL2yFXbJYTQuoYoj8geLc";

  const generateGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      // Updated API endpoint to use gemini-2.0-flash model and v1beta API version
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a professional financial advisor assistant. The user's name is Alex. Provide helpful financial advice based on the following query: ${prompt}
                  
                  Include information about Alex's portfolio if relevant:
                  - Stocks: 40% allocation (Technology sector performing well at +8.2%)
                  - Mutual Funds: 25% allocation (Vanguard Growth Fund: +12% YTD)
                  - Fixed Deposits: 20% allocation (5.2% avg interest, next maturity in 45 days)
                  - Bonds: 10% allocation (Treasury bonds, 4.1% yield)
                  - Cash: 5% allocation
                  
                  Risk profile: Moderate
                  Retirement goal: $2.5M by age 58
                  Current progress: On track
                  
                  Keep your response concise, professional, and tailored to the portfolio details above.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          }
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        console.error("Gemini API error:", data.error);
        return "I'm sorry, I encountered an issue while processing your request. Please try again later.";
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I'm sorry, I encountered an issue while processing your request. Please try again later.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Generate response using Gemini API
      const response = await generateGeminiResponse(input);
      
      // Add bot message with the response
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-wealth-dark-green p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-wealth-accent-gold rounded-full mr-2"></div>
          <h3 className="font-medium">Financial Advisor</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-gray-300 hover:text-white hover:bg-black hover:bg-opacity-20"
        >
          <X size={18} />
        </Button>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-wealth-medium-green text-white"
                    : "bg-black bg-opacity-40 text-gray-100 border border-wealth-dark-green"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-black bg-opacity-40 text-gray-100 border border-wealth-dark-green max-w-[80%] rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-wealth-dark-green flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your finances..."
          className="bg-black bg-opacity-40 border-wealth-dark-green text-white mr-2"
        />
        <Button 
          type="submit" 
          className="bg-wealth-medium-green hover:bg-wealth-dark-green text-white"
          disabled={isTyping}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
