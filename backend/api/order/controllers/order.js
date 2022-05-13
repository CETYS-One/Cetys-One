"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findMe: async (ctx) => {
    const store = ctx.state.user.cafeteria;
    const params = ctx.query;
    const orders = await strapi.services.order.find({
      to: store,
      ...params,
    });
    return orders;
  },
  findMeUser: async (ctx) => {
    const id = ctx.state.user.id;
    const params = ctx.query;
    const orders = await strapi.services.order.find({
      from: id,
      ...params,
    });
    return orders;
  },
  statisticsMe: async (ctx) => {
    const store = ctx.state.user.cafeteria;
    const orders = await strapi.services.order.find({
      to: store,
    });

    // Should return

    return orders;
  },
};
