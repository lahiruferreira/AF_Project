const router = require('express').Router();
let Feedback = require('../schemas/feedback.model');

router.route('/').get((req, res) => {
    Feedback.find()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const rating= req.body.rating;
    const comment = req.body.comment;

    const newFeedback = new Feedback({
        name,
        email,
        rating,
        comment
    });

    newFeedback.save()
        .then(() => res.json('Feedback Posted!'))
        .catch(err => res.status(400).json('Error is: ' + err));
});

module.exports = router;