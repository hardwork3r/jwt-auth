const ProductModel = require('../models/product-model');
const ApiError = require('../exceptions/api-errors');
const UserModel = require("../models/user-model");

class ProductService {
    async createProduct({ preview, name, description, price }) {
        const productFind = await ProductModel.findOne({name});
        if (productFind) {
            throw ApiError.BadRequest(`Продукт с именем ${name} уже существует.`);
        }
        if (!preview) {
            throw ApiError.BadRequest('Отсутствуют данные изображения для продукта');
        }
        const product = await ProductModel.create({preview, name, description, price });
        return product;
    }

    async getAllProducts() {
        const products = await ProductModel.find();
        return products;
    }

    async getOneProduct({name}) {
        const product = await ProductModel.find({name});
        return product;
    }

    async deleteOneProduct({name}) {
        const product = await ProductModel.deleteOne({name});
        return product;
    }
}

module.exports = new ProductService();