const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Contact = require("../models/Contacts");

// @route GET api/contacts
// @desc get all user contacts
// @access Private
// Get all contacts
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

// @route POST api/contacts
// @desc add new contact
// @access Private
// Add new contact
router.post(
    "/",
    [auth, [check("name", "Name is required").not().isEmpty()]],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });
            const contact = await newContact.save();
            return res.json(contact);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route PUT api/contacts
// @desc update contact
//@access Private
router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    //build contact object
    const contactFields = {};
    if (name) contactFields["name"] = name;
    if (email) contactFields["email"] = email;
    if (phone) contactFields["phone"] = phone;
    if (type) contactFields["type"] = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact not found" });

        //Make sure user owns the contact object
        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: "Not authorized" });

        // Finally update the contact and send back saved Contact in response
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );
        res.json(contact);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

// @route DELETE api/contacts
// @desc delete contact
//@access Private
router.delete("/:id",auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact not found" });

        //Make sure user owns the contact object
        if (contact.user.toString() !== req.user.id)
            return res.status(401).json({ msg: "Not authorized" });

        // Finally update the contact and send back saved Contact in response
        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact removed" });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
