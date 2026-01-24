require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer);

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnecetd ");
  });

  socket.on("ai-message", async (data) => {

    console.log("Recieved ai-message", data);

    chatHistory.push({
        role : "user",
        parts : [{text : data}]
    })

    const response = await generateResponse(chatHistory);

     chatHistory.push({
        role : "model",
        parts : [{text : response}]
    })

    console.log("Ai-response:", response);

    socket.emit("ai-message-response",response)

  });
});

httpServer.listen(3000, () => {
  console.log("Server is running at port 3000");
});
