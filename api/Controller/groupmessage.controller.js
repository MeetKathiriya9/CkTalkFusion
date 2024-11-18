import GROUPMSG from "../Model/groupmsg.model.js";


export const sendGmsg = async (req, res, next) => {

    const { groupid, sender, message } = req.body;
    try {
        const msg = await GROUPMSG.create({
            groupid,
            sender,
            message
        })

        if(!msg){
            return res.status(405).json({ message: "Group msg not send.." });
        }

        res.status(200).json({msg});

    } catch (error) {
        console.error(error);
    }
}