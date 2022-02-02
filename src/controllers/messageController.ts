import { Request, Response } from 'express';
import { Message } from '../models/MessageModel';

/* Route for getting all the messages for a private chat */
export async function getMessages(req: Request, res: Response) {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chatId });
    res.status(200).json({ data: messages.length, messages });
  } catch (error) {
    res.status(404).json({ error: 'Unable to get group messages' });
  }
}

/*
export async function getMessages(req: Request, res: Response) {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(404).json({ error: 'Unable to get group messages' });
  }
}

 Route for getting all the messages for a specific chat-room
 specified by the query parameter room 
export async function getGroupMessages(req: Request, res: Response) {
  try {
    let id = req.params.groupId;
    const chatGroup = Message.find({ id, chatType: 'Group' });
    if (!chatGroup) {
      return res.status(404).json({ message: 'Group does not exist!' });
    }
    res.status(200).json({ data: chatGroup });
  } catch (error) {
    res.status(500).json({ error: 'Not available' });
  }
}

*/
