import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";


type SenderType = "user" | "bot";

interface MessageType {
  sender: SenderType;
  text: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Chatbot() {
  const [messages, setMessages] = useState<MessageType[]>([
    { sender: "bot", text: "Hi! Describe your symptoms and I'll help you." }
  ]);
  const [responding, setResponding] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text }]);
    setMessages(prev => [...prev, { sender: "bot", text: "Responding..." }]);
    setResponding(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages(msgs => [
        ...msgs.slice(0, -1),
        { sender: "bot", text: data.reply || "Sorry, I couldn't process that." }
      ]);
    } catch {
      setMessages(msgs => [
        ...msgs.slice(0, -1),
        { sender: "bot", text: "Sorry, something went wrong. Please try again." }
      ]);
    }
    setResponding(false);
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-6 min-h-[500px] w-full max-w-4xl mx-auto border border-gray-100">
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <Message key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="mt-auto">
        <InputBox onSend={handleSend} disabled={responding} />
      </div>
    </div>
  );
}
