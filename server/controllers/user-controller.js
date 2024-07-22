const userService = require('../service/user-service');
const productService = require('../service/product-service');
const purchaseService = require('../service/purchase-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-errors');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации.', errors.array()));
                // return next(res.status(400).json({ error: 'Ошибка при валидации.', errors: errors.array() }));
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 25 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 25 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 25 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async saveProduct(req, res, next) {
        try {
            const { preview, name, description, price } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }

            const product = await productService.createProduct({ preview, name, description, price });
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }
    async products(req, res, next) {
        try {
            const products = await productService.getAllProducts();
            return res.json(products);
        } catch (e) {
            next(e);
        }
    }
    async product(req, res, next) {
        try {
            const { name } = req.body;
            const product = await productService.getOneProduct({name});
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }
    async productPaid(req, res, next) {
        try {
            const { name } = req.body;
            const product = await productService.deleteOneProduct({name});
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }
    async savePurchase(req, res, next) {
        try {
            const { email, name } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }

            const purchase = await purchaseService.createPurchase({ email, name });
            return res.json(purchase);
        } catch (e) {
            next(e);
        }
    }
    async purchases(req, res, next) {
        try {
            const { email } = req.body;
            const purchases = await purchaseService.getAllPurchases({email});
            return res.json(purchases);
        } catch (e) {
            next(e);
        }
    }
    async deleteFromBasket(req, res, next) {
        try {
            const {email, name} = req.body;
            const deleteOne = await purchaseService.deletePurchase({email, name})
            return res.json(deleteOne);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();