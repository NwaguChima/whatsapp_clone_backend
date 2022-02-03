import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/MessageModel';
import { CustomRequest } from '../utils/custom';




export const deleteMessage = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
    
        console.log(req.params, "request parameters")
    
    const result = await Message.findOneAndDelete({ chatId: req.params.chatId})
    console.log(result, "hhh")
        
        return res.status(201).json({ status: "success", message: " message deleted....", result})

    


} catch (error) {
    return res.status(500).json({error});
}
}



