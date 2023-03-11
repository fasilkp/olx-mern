import UserModel from '../models/userModel.js';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


var salt = bcrypt.genSaltSync(10);

export async function userRegister(req, res) {
    try {
        const { name, email, password, about, proffession } = req.body;
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ error: true, message: "User Already Exist" })
        }
        const newUser = new UserModel({ name, email, password: hashPassword, about, proffession })
        await newUser.save();
        console.log(newUser)
        const token = jwt.sign(
            {
                id: newUser._id
            },
            "myjwtsecretkey"
        )
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ error: false })
    }
    catch (err) {
        res.json({ error: err })
        console.log(err);
    }
}






