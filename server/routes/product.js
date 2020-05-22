const router = require('express').Router();
let Product = require('../schemas/product.model');
const multer = require('multer');
const path = require("path");
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(null, false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


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
    const PDiscount = 0;
    const PImage = req.body.PImage;


    const newProduct = new Product({
        PName,
        PDescription,
        PCategory,
        PBrand,
        PAmount,
        PPrice,
        PDiscount,
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
                product.PDiscount = Number(req.body.PDiscount);
                product.PImage = req.body.PImage;

                product.save()
                    .then(() => res.json('Product updated'))
                    .catch(err => res.status(400).json('Error is: ' + err));
            })
            .catch(err => res.status(400).json('Error is:' + err));
    });

module.exports = router;