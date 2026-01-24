# 🤖 AbiChat — Real-Time AI Chatbot

AbiChat is a **real-time AI chatbot** built to understand and implement **Socket.IO** by building something practical instead of just reading documentation.  
It focuses on **real-time communication, reliability, and graceful handling of external AI API failures**.

🌐 **Live Demo:**  
👉 https://abichat.vercel.app/

💻 **GitHub Repository:**  
👉 https://github.com/Abi-390/aiChatBot

---

## 🚀 Features

- Real-time chat using **Socket.IO**
- AI-powered responses using **Gemini AI API**
- Graceful handling of:
  - AI API delays
  - AI overload (503 errors)
  - Backend cold starts (free-tier deployments)
- Clean, responsive UI inspired by ChatGPT
- Stable backend that never crashes on API failures
- Proper CORS handling for frontend ↔ backend communication

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Socket.IO Client
- Responsive UI (Mobile + Desktop)

### Backend
- Node.js
- Express.js
- Socket.IO
- Gemini AI API
- Environment-based configuration

---

## 📁 Project Structure

aiChatBot/
├── frontend/
│ ├── src/
│ │ ├── App.jsx # Main React component
│ │ ├── main.jsx # React entry point
│ │ └── index.css # Tailwind CSS styles
│ ├── public/ # Static assets
│ ├── package.json # Frontend dependencies
│ └── vite.config.js # Vite configuration
│
├── backend/
│ ├── src/
│ │ ├── services/
│ │ │ └── ai.service.js # Gemini AI integration logic
│ │ └── app.js # Express app configuration
│ ├── server.js # HTTP + Socket.IO server
│ ├── package.json # Backend dependencies
│ └── .env # Environment variables (not committed)
│
└── README.md # Project documentation

---

## ⚙️ How It Works

1. User sends a message from the frontend
2. Message is sent to the backend using **Socket.IO**
3. Backend forwards the request to **Gemini AI**
4. AI response is sent back in real-time
5. Frontend updates chat history instantly

If the AI API is overloaded or unavailable, AbiChat:
- Shows a friendly error message
- Keeps the app running without crashing

---

## 🖥️ Local Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Abi-390/aiChatBot.git
.env(backend) GEMINI_API_KEY=your_gemini_api_key

