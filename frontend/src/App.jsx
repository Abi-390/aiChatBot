import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [serverReady, setServerReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    
    socket.on("connect", () => {
      setServerReady(true);
    });

    socket.on("ai-message-response", (response) => {
      setIsThinking(false);

      
      if (
        response.includes("busy") ||
        response.includes("failed") ||
        response.includes("error")
      ) {
        setErrorMessage(
          "Sorry, our AI model is overloaded right now. Please try again later."
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("ai-message-response");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || isThinking) return;

    setErrorMessage("");
    setIsThinking(true);

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
    ]);

    socket.emit("ai-message", input);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
     
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <h1 className="text-center text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          AbiChat
        </h1>
      </div>

      
      <div className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
        <div className="w-full max-w-3xl space-y-4">

          
          {!serverReady && (
            <div className="text-center text-gray-500 italic">
              Please wait, our backend servers are starting…
            </div>
          )}

        
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg max-w-[85%] sm:max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-white text-black mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}

          
          {isThinking && (
            <div className="bg-white text-gray-500 px-4 py-2 rounded-lg max-w-[70%] mr-auto italic">
              AbiChat is thinking… please wait
            </div>
          )}

         
          {errorMessage && (
            <div className="text-center text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
        </div>
      </div>

     
      <div className="border-t bg-white px-4 py-3 flex justify-center">
        <div className="w-full max-w-3xl flex gap-2">
          <input
            type="text"
            value={input}
            disabled={!serverReady || isThinking}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              !serverReady
                ? "Starting server…"
                : "Ask something…"
            }
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
          />
          <button
            onClick={sendMessage}
            disabled={!serverReady || isThinking}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
