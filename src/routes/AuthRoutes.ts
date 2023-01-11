const express = require('express')

const {
    loginUser,
    registerUser
} = require('../controllers/AuthControllers')



router.post('/register', registerUser)
router.post('/login', loginUser)


module.exports = router