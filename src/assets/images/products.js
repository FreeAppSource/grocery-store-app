// Product photos from the design, keyed by product id (see src/data.js productsData).
export const productImages = {
  'p-potato': require('./product_potato.png'),
  'p-tomato': require('./product_tomato.png'),
  'p-spinach': require('./product_spinach.png'),
  'p-milk': require('./product_milk.png'),
  'p-maggi': require('./product_maggi.png'),
  'p-apple': require('./product_apple.png'),
  'p-onion': require('./product_onion.png'),
};

export const getProductImage = (id) => productImages[id] || productImages['p-potato'];
