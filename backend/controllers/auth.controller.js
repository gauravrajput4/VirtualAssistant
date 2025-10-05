// auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12d" });
};


export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }


        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 12);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });


        const token = genToken(user._id);


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 12 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false,
        });


        return res.status(201).json({ user });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 12 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false,
        });

        return res.status(200).json({ user });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ success: "Logged out successfully" });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
