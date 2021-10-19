const { check } = require('express-validator');

exports.signupValidation = [
    check('username', 'Username is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

exports.loginValidation = [
     check('username', 'Username is required').not().isEmpty(),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })

]

exports.categoryValidation = [
    check('category_name', 'category name is required').not().isEmpty(),
    check('category_description', 'category description is required').not().isEmpty(),
    check('category_count', 'category count is required').not().isEmpty(),
    check('category_status', 'category status is required').not().isEmpty(),

]

