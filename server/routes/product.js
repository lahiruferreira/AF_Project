const router = require('express').Router();
let Product = require('../schemas/product.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const PName = req.body.PName;
    const PDescription = req.body.PDescription;
    const PCategory = req.body.PCategory;
    const PBrand = req.body.PBrand;
    const PAmount = req.body.PAmount;
    const PPrice = Number(req.body.PPrice);
    const PImage = req.body.PImage;


    const newProduct = new Product({
        PName,
        PDescription,
        PCategory,
        PBrand,
        PAmount,
        PPrice,
        PImage,
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').get((req, res) => {
       Product.findById(req.params.id)
           .then(product => res.json(product))
           .catch(err => res.status(400).json('Error:' + err));
    });

    router.route('/:id').delete((req, res) => {
        Product.findByIdAndDelete(req.params.id)
            .then(() => res.json('Product Deleted!'))
            .catch(err => res.status(400).json('Error:' + err));
    });

    router.route('/update/:id').post((req, res) => {
        Product.findById(req.params.id)
            .then(product => {
                product.PName = req.body.PName;
                product.PDescription = req.body.PDescription;
                product.PCategory = req.body.PCategory;
                product.PBrand =req.body.PBrand;
                product.PAmount = Number(req.body.PAmount);
                product.PPrice = Number(req.body.PPrice);
                product.PImage = req.body.PImage;

                product.save()
                    .then(() => res.json('Product updated'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error:' + err));
    });

module.exports = router;