const router = require('express').Router();
let Category = require('../schemas/category.model');

router.route('/').get((req, res) => {
    Category.find()
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const cname = req.body.cname;
    const cdescription = req.body.cdescription;

    const newCategory = new Category({
        cname,
        cdescription,
    });

    newCategory.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error is: ' + err));
});

module.exports = router;