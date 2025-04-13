let io = null;

function initSocket(server) {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "https://plivo-frontend.onrender.com", // frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

function emitStatusUpdate(data) {
  if (io) {
    io.emit("status-update", data); // Broadcast update to all clients
  }
}

module.exports = { initSocket, emitStatusUpdate };
