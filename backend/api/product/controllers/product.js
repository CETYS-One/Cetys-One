"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const groupByCategories = (products) => {
  const categories = {};
  for (const product of products) {
    const category = product.category.name;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(product);
  }
  return categories;
};

module.exports = {
  findShop: async (ctx) => {
    const { shop } = ctx.params;
    const params = ctx.query;
    const products = await strapi.services.product.find({
      from: shop,
      ...params,
    });
    return products;
  },
  findShopByCategories: async (ctx) => {
    const { shop } = ctx.params;
    const { _limit, _start, ...query } = ctx.query;
    const products = await strapi.services.product.find({
      ...query,
      from: shop,
    });
    const categories = groupByCategories(products);

    // Necesitamos ahora obtener el next cursor
    // Start es desde donde empieza

    const nextCursor = Math.min(
      parseInt(_start) + parseInt(_limit),
      Object.keys(categories).length
    ); // No queremos pasarnos
    const requestedCategories = Object.keys(categories).slice(
      _start,
      nextCursor
    );

    console.log(_start, nextCursor, requestedCategories);

    const filtered = { cursor: nextCursor };
    for (const category of requestedCategories) {
      filtered[category] = categories[category];
    }

    return filtered;
  },
};
