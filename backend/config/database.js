module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        // uri: env("DATABASE_URI", null),
        host: "127.0.0.1",
        srv: false,
        port: 27017,
        database: "cetys-one",
        username: null,
        password: null,
      },
      options: {
        ssl: true,
      },
    },
  },
});
