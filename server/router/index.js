const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:5, max:32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/saveProduct', authMiddleware, userController.saveProduct)
router.post('/addPurchase', authMiddleware, userController.savePurchase);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/products', authMiddleware, userController.products);
router.post('/product', authMiddleware, userController.product);
router.post('/purchases', authMiddleware, userController.purchases);
router.post('/delete', authMiddleware, userController.deleteFromBasket);
router.post('/paid', authMiddleware, userController.productPaid);


module.exports = router;