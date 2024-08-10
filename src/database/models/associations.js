import Product from './product.js';
import Category from './category.js';

// Definir relaciones
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

export { Product, Category };