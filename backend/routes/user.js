const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { user } = require('../models/models')

/* GET all the roles, used for testing ONLY
router.get('/', (req, res, next) => {
    user
        .find({ org: org }, (error, data) => {
            if (error) {
                return next(error)
            } else {
                return res.json(data)
            }
        })
        // sort by date ascending
        .sort({ date: 1 })
        .limit(10)
})
*/

// verify a login, authorize an user using cookies
router.post('/login', (req, res) => {
    try {
        // find the role with the stated username
        user.findOne({ username: req.body.username }, (err, role) => {
            console.log(req.body)
            if (!err) {
                try {
                    // Differentiate roles to give the correct response
                    const username = role.username
                    // mongoose-bcrypt method
                    role.verifyPassword(req.body.password)
                        .then(function (valid) {
                            if (valid) {
                                if (username === 'viewer') {
                                    // give a response so FE can set cookies/storage
                                    res.json({ isAuthorized: 'view' })
                                }
                                if (username === 'editor') {
                                    res.json({ isAuthorized: 'edit' })
                                }
                            } else {
                                res.status(401).send('Incorrect password')
                            }
                        })
                        .catch(function (err) {
                            console.log(err)
                        });
                    // error handling in case of required fields not provided
                } catch (err) {
                    console.error(err)
                    res.status(500).json({ error: 'Unrecognized Fields!' })
                }
            }
        })
        // error handling for unexpected cases
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server Error' })
    }
})

module.exports = router
