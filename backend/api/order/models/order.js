"use strict";
const socket = require("../../../helpers/socket");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate(result) {
      // Aqui es donde mando una notificacion
      socket.getIO().sockets.emit("order", result.to);
      console.log(result);
    },
  },
};
