import User from "../Model/user.model.js";
import bcrypt from 'bcryptjs'


export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({ users });
    } catch (error) {
        console.log("Error: " + error);
    }
}

export const getUserData = async (req, res, next) => {

    try {
        const email = req.params.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found here.." });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.log("Error: " + error);
    }
}

export const getUsersname = async (req, res, next) => {

    try {
        const id = req.params.id;

        const user = await User.findOne({ _id:id });

        if (!user) {
            return res.status(404).json({ message: "User not found here.." });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.log("Error: " + error);
    }
}


export const AddUser = async (req, res, next) => {

    const { name, email, password, photo } = req.body.formData;

    try {

        const hashpassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, email, password: hashpassword, photo
        });
        console.log("1");

        res.status(200).json({ UserData: user });

    } catch (error) {
        console.log("Error: " + error);
    }
}


export const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const Validatepass = await bcrypt.compare(password, user.password);

        if (!Validatepass) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ UserData: user });

    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "An error occurred during login" });
    }
}
