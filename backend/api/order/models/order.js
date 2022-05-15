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
    afterUpdate(result) {
      const res = {
        status: result.status, // status de la orden
        _id: result._id, // id de la orden
        to: result.to, // cafeteria
        user: result.from._id,
      };
      socket.getIO().sockets.emit(`order-${result.from._id}`, res);
    },
  },
};
