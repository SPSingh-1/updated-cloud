const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
//Create a User using POST "/api/auth".Doesn't require Auth
router.post('/', [
    body('name','Enter a valid Name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min: 5}),
], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
    res.json({error: 'please enter a unique value for email',message:err.message})
    });
    // res.send(req.body);
})

module.exports = router