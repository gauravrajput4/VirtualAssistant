import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment";


export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ message: "User not found!" });

        return res.status(200).json(user);
    } catch (error) {
        console.error("GetCurrentUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;
        let assistantImage = null;

        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);
        } else if (imageUrl) {
            assistantImage = imageUrl;
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                assistantName: assistantName || "",
                assistantImage: assistantImage || "",
            },
            { new: true }
        ).select("-password");

        return res.status(200).json(user);
    } catch (error) {
        // console.error(error);
        return res.status(400).json({ message: "updateAssistant failed" });
    }
};


export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body;
        const user = await User.findById(req.userId).select("-password");


        user.history.push(command);
        user.save()


        const userName = user.username;
        const assistantName = user.assistantName;
        // console.log("hiii "+assistantName);
        // console.log("jhjhejkfe "+user)
        // console.log(command)


        const geminiRes = await geminiResponse(command);

        const type = geminiRes.type;

        switch (type) {
            case 'get_date':
                return res.json({
                    type,
                    userInput: geminiRes.userInput,
                    response: `Current date is ${moment().format('YYYY-MM-DD')}`,
                });
            case 'get_time':
                return res.json({
                    type,
                    userInput: geminiRes.userInput,
                    response: `Current time is ${moment().format('HH:mm A')}`,
                });
            case 'get_day':
                return res.json({
                    type,
                    userInput: geminiRes.userInput,
                    response: `Today is ${moment().format('dddd')}`,
                });
            case 'get_month':
                return res.json({
                    type,
                    userInput: geminiRes.userInput,
                    response: `Current month is ${moment().format('MMMM')}`,
                });
            case 'google_search':
            case 'youtube_search':
            case 'youtube_play':
            case 'general':
            case 'calculator_open':
            case 'instagram_open':
            case 'facebook_open':
            case 'weather_show':
                return res.json({
                    type,
                    userInput: geminiRes.userInput,
                    response: geminiRes.response,
                });
            default:
                return res.status(400).json({
                    response: "I did not understand that command"
                });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            response: "Ask assistant error",
        });
    }
};