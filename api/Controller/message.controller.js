import MSG from "../Model/message.model.js";


export const SendMsg = async (req,res,next) => {
    const {sender, receiver, message} = req.body;

    try {
        
        const messagedata = await MSG.create({
            sender, receiver, message
        });
        
        if(!messagedata){
            return res.status(400).json({message: "Failed to send message"})
        }

        res.status(200).json({messagedata});

    } catch (error) {
        console.error("error at send: ",error);
    }
}