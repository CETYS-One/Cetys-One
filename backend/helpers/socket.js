let io;

module.exports = {
  connect: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => io,
};
