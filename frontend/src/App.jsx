import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   
    socket.on("ai-message-response", (response) => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response },
      ]);
    });

    
    return () => {
      socket.off("ai-message-response");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
    ]);

   
    socket.emit("ai-message", input);

    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold">
        AbiChat
      </div>

    
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-black mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      
      <div className="p-4 flex gap-2 bg-white border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className=" bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
