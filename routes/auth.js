const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

// @route GET api/auth
// @desc Get logged in user
//@access Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
        
    }
});

// @route POST api/auth
// @desc auth user and get token //login
// @access Public
router.post(
    "/",
    [
        check("email", "include a valid email address").isEmail(),
        check("password", "password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
