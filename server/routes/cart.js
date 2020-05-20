const router = require('express').Router();
let Product = require('../schemas/product.model');
var Cart = require('../schemas/cart.model')

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/add-to-cart/:id', function (req,res,next) {
    console.log('inside route');
    var productID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart :{});

    Product.findById(productID,function (err,product) {
        if(err){
            console.log('add to cart not working');
            return res.redirect('/')
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        console.log('from add tp cart');
        console.log(req.session.cart);
        res.redirect('/');
    })
});

module.exports = router;