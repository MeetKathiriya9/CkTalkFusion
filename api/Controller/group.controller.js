import Group from "../Model/group.model.js";
import User from "../Model/user.model.js";

export const createGroup = async (req, res, next) => {
    const { gname, users, photo } = req.body;
    // console.log("called");

    try {
        const data = await Group.create({
            gname, users, photo
        });

        if (!data) {
            console.log("error at group", data.message);
        }

        res.status(200).json({ data });
    } catch (error) {
        console.log(error);

    }
}

export const getGroups = async (req, res, next) => {

    try {
        const data = await Group.find();

        if (!data) {
            console.log("error at group", data.message);
        }

        res.status(200).json({ data });

    } catch (error) {
        console.log(error);

    }
}



export const getGroupMembernames = async (req, res, next) => {

    try {
        const id = req.params.id;

        const user = await User.findbyId(mongoose.Types.ObjectId(id));

        if (!user) {
            return res.status(404).json({ message: "User not found here.." });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.log("Error: " + error);
    }
}



// export const getGroupmembername = async (req, res, next) => {

//     const { id } = req.params.groupid;
//     try {
//         const data = await Group.find();

//         if (!data) {
//             console.log("error at group", data.message);
//         }

//         res.status(200).json({ data });

//     } catch (error) {
//         console.log(error);

//     }
// }