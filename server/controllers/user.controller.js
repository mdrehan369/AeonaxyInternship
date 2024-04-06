import { userModel } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { Resend } from "resend"

const signupController = async (req, res) => {
    try {

        const { name, username, email, password } = req.body;

        if ([name, username, email, password].some((field) => field.trim() == '')) {
            throw new Error("Some fields are missing");
        }

        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (user) {
            if (user.email == email) throw new Error("Email is already taken");
            if (user.username == username) throw new Error("Username is already taken");
        }

        const newUser = await userModel.create({ name, username, email, password });

        res
            .status(200)
            .json({
                message: true,
                data: newUser
            });


    } catch (err) {
        res
            .status(400)
            .json({
                success: false,
                message: err.message
            });
    }
}

const updateAvatarController = async (req, res) => {
    try {

        const avatarImagePath = req.file?.path;
        const { location, username } = req.body;

        if (!avatarImagePath) throw new Error("No avatar image");
        if (!location) throw new Error("No location");
        if (!username) throw new Error("No username");

        const user = await userModel.findOne({ username });
        if (!user) throw new Error("No user exists");

        const avatar = await uploadToCloudinary(avatarImagePath);

        if (!avatar) throw new Error("Some error occured while uploading image");

        user.avatar = avatar.url;
        user.location = location;
        await user.save()

        res
            .status(200)
            .json({
                success: true,
                message: "Avatar and location updated",
                data: user
            });

    } catch (err) {
        res
            .status(400)
            .json({
                success: false,
                message: err.message
            });
    }
}

const updateOptionController = async (req, res) => {
    try {

        const { option, username } = req.body;

        if (!option) throw new Error("No option");
        if (!username) throw new Error("No username");

        const user = await userModel.findOne({ username });

        if (!user) throw new Error("No user exists");

        user.option = option;
        await user.save();

        res
            .status(200)
            .json({
                success: true,
                message: "Option updated successfully"
            });

    } catch (err) {
        res
            .status(400)
            .json({
                success: false,
                message: err.message
            });
    }
}

const sendEmailController = async (req, res) => {
    try {

        const { email } = req.params;

        if (!email) throw new Error("No email");

        const user = await userModel.findOne({email});
        if(!user) throw new Error("No user exists");
        
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'aeonaxyIntern@resend.dev',
            to: email,
            subject: 'Thank You message',
            html: '<p>Thank You For<strong>Registering</strong>!</p>'
        });

        res
            .status(200)
            .json({
                success: true,
                message: "Email sent successfully"
            });

    } catch (err) {
        res
            .status(400)
            .json({
                success: false,
                message: err.message
            });
    }
}

export {
    signupController,
    updateAvatarController,
    updateOptionController,
    sendEmailController
}
