"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findShop: async (ctx) => {
    const { shop } = ctx.params;
    const products = await strapi.services.product.find({ from: shop });
    return products;
  },
  findShopByCategories: async (ctx) => {
    const { shop } = ctx.params;

    const products = await strapi.services.product.find({ from: shop });

    const categories = {};

    // console.log("PR", products);
    for (const product of products) {
      const category = product.category.name;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(product);
    }

    return categories;
  },
};
