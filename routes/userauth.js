import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

// @route   POST /api/user/register
// @desc    Register User
// @access  Public
router.post('/register', async (req, res) => {
    try {
        console.log('Entered register');
        const salt = await bcrypt.genSalt();
        const hashedPasssword = await bcrypt.hash(req.body.password, salt);

        const existUser = await User.find({username: req.body.username});
        console.log(existUser);

        if(existUser.length > 0) {
            console.log('Entered existUser');
            res.json("User already exists");
            return;
        }

        const user = {username: req.body.username, password: hashedPasssword};

        await User.create(user);

        res.json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json("Server Error");
    }
});

// @route   POST /api/users/login
// @desc    Login User
// @access  public
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({username: req.body.username});
        if(user.length === 0) {
            res.json("User does not exist");
            return;
        }

        try {
            console.log('Entered bcrypt login');
            await bcrypt.compare(req.body.password, user[0].password);
            
            // JWT sign and create token
            const username = req.body.username;
            const loginUser = {username: username}

            const accessToken = jwt.sign(loginUser, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken: accessToken});
        } catch (err) {
            console.error(err.message);
            res.status(500).json('Server Error in bcrypt');
        }
    } catch (err) {
        res.status(500).json('Server Error');
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).json("Server Error");
    }
});


export default router;
