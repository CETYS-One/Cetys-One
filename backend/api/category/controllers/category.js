"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findMe: async (ctx) => {
    const store = ctx.state.user.cafeteria;
    const data = await strapi.services.category.find({ from: store });
    return data;
  },
  createMe: async (ctx) => {
    const store = ctx.state.user.cafeteria;
    const data = await strapi.services.category.create({
      ...ctx.request.body,
      from: store,
    });
    return data;
  },
};
