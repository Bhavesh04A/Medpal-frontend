import { useState } from "react";

interface InputBoxProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function InputBox({ onSend, disabled }: InputBoxProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-3xl mx-auto">
      <input
        className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 transition-all shadow-sm hover:shadow-md disabled:opacity-70"
        placeholder="Describe your symptoms..."
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 active:bg-blue-800 disabled:opacity-70 transition-colors shadow-md hover:shadow-lg font-medium"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}