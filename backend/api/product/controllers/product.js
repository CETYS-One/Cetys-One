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
    const products = await strapi.services.product.find({ from: shop });
    return products;
  },
  findShopByCategories: async (ctx) => {
    const { shop } = ctx.params;

    const products = await strapi.services.product.find({
      ...ctx.query,
      from: shop,
    });
    const categories = groupByCategories(products);

    return categories;
  },
};
