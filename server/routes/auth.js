import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email})
        if(user) {
            return res.status(401).json({success: false, message:"User already taken"})
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: hashpassword
        })

        await newUser.save()

        return res.status(200).json({success: true, message:"Account Created Successfully"})
    }catch(error) {
        return res.status(500).json({success: true, message:"Account Created Failed"})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({success: false, message:"User Not taken"})
        }

        const checkpassword = await bcrypt.compare(password, user.password)

        if(!checkpassword) {
            return res.status(401).json({success: false, message: "Wrong Credentials"})
        }


        return res.status(200).json({success: true, message:"Login Successfully"})
    }catch(error) {
        return res.status(500).json({success: true, message:"Login Failed"})
    }
})


export default router