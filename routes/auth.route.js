const express = require("express");
const { signup, login } = require("../controllers/auth.controller");

const router = express.Router();
router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", (req, res) => {
    res.send("Logout Endpoint")
})

module.exports = router