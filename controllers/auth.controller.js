
const { sendWelcomeEmail } = require('../emails/emailHandler');
const { generateToken } = require('../lib/utils');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const dotenv = require("dotenv")

const signup = async (req, res) => {


    const { fullName, email, password } = req.body

    try {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address"
            });
        }


        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "User already exitst" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {

            const savedUser = await newUser.save()
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profile
            })

            try {
                await sendWelcomeEmail(savedUser?.email, savedUser?.fullName, process.env.CLIENT_URL)
            } catch (error) {
                console.log("Failed to send welcome message", error)
            }
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "Invalid Credantials" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credantials" })

        generateToken(user._id, res)

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profile
        })

    } catch (error) {
        console.log("Error in login controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = { signup, login }