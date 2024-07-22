const UserModel = require('../models/user-model');
const ApiError = require('../exceptions/api-errors');
const PurchaseModel = require("../models/purchase-model");
const ProductModel = require("../models/product-model");

class PurchaseService {
    async createPurchase({ email, name }) {
        const purchaseFind = await PurchaseModel.findOne({name});
        if (purchaseFind) {
            throw ApiError.BadRequest(`Продукт с именем ${name} уже добавлен в корзину.`);
        }

        const userFind = await UserModel.findOne({email});
        if (!userFind) {
            throw ApiError.BadRequest(`Пользователь с адресом ${email} не авторизован.`);
        }

        const productFind = await ProductModel.findOne({name});
        if (!productFind) {
            throw ApiError.BadRequest(`Продукт ${name} не найден.`);
        }

        const purchase = await PurchaseModel.create({ email, name });
        return purchase;
    }

    async getAllPurchases({email}) {
        const purchases = await PurchaseModel.find({email});
        return purchases;
    }

    async deletePurchase({email, name}){
        const result = await PurchaseModel.deleteOne({email, name});
        console.log(result);
    }
}

module.exports = new PurchaseService();