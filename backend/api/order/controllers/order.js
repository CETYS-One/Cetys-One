"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findMe: async (ctx) => {
    const store = ctx.state.user.cafeteria;
    const orders = await strapi.services.order.find({ tienda: store });
    return orders;
  },
};
