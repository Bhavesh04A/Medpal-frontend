interface MessageProps {
  sender: "user" | "bot";
  text: string;
}

export default function Message({ sender, text }: MessageProps) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 mx-auto max-w-3xl`}>
      <div
        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none shadow-md"
            : "bg-gray-100 text-gray-800 rounded-bl-none shadow-md"
        } text-sm sm:text-base transition-all`}
      >
        {text}
      </div>
    </div>
  );
}