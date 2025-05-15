
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

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

  // Sample responses based on keywords
  const getBotResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes("portfolio") || lowerCaseMessage.includes("assets")) {
      return "Your portfolio is showing strong performance with a 5.2% increase since last month. Your stocks are performing particularly well, especially in the technology sector.";
    } else if (lowerCaseMessage.includes("stock") || lowerCaseMessage.includes("invest")) {
      return "Based on your risk profile and financial goals, I'd recommend allocating more to growth stocks in the technology and healthcare sectors. Would you like specific recommendations?";
    } else if (lowerCaseMessage.includes("mutual fund")) {
      return "Your mutual funds account for 25% of your portfolio. The Vanguard Growth Fund has been your best performer with a 12% return this year.";
    } else if (lowerCaseMessage.includes("fixed deposit") || lowerCaseMessage.includes("fd")) {
      return "Your fixed deposits make up 20% of your portfolio with an average interest rate of 5.2%. The next FD matures in 45 days.";
    } else if (lowerCaseMessage.includes("risk")) {
      return "Your current portfolio has a moderate risk level. Based on your age and financial goals, this is well-aligned with your investment strategy.";
    } else if (lowerCaseMessage.includes("retire") || lowerCaseMessage.includes("retirement")) {
      return "Your retirement savings are on track. Based on your current contributions and investment growth, you're projected to reach your retirement goal of $2.5M by age 58.";
    } else if (lowerCaseMessage.includes("tax") || lowerCaseMessage.includes("taxes")) {
      return "I recommend maximizing your tax-advantaged accounts first. You still have $4,000 in contribution room in your IRA this year.";
    } else if (lowerCaseMessage.includes("recommend") || lowerCaseMessage.includes("advice")) {
      return "Based on your portfolio and market conditions, I recommend increasing your exposure to dividend-paying stocks and considering adding more international diversification.";
    } else {
      return "I'm here to help with any questions about your investments, portfolio performance, or financial planning. What specific information would you like to know?";
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
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
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
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
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
