import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/MessageModel';
import Chalk from 'chalk';
import { CustomRequest } from '../utils/custom';
import cloudinary from '../utils/cloud_data/cloudinary-main';

const red = Chalk.magenta.inverse.italic;
const green = Chalk.green.inverse.italic;

let message = {};

export const getMediaType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const media = req.body.mediaType;
  console.log(red(media));
  res.status(200).json({ data: req.body });
  return;
  // next();
};

export const createMessages = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let result;
    if (req.body.mediaType) {
      result = await cloudinary.uploader.upload(req.file!.path, {
        resource_type: 'raw',
      });
    }

    if (!req.body.chatId) req.body.chatId = req.params.chatId;
    if (!req.body.senderId) req.body.senderId = req.user.id;

    if (!req.body.text && !req.body.mediaType) {
      throw new Error('Message must have a content');
    }

    if (result) {
      message = {
        ...req.body,
        mediaUrl: result.secure_url,
        mediaId: result.public_id,
      };
    } else {
      message = {
        ...req.body,
      };
    }

    const newMessage = await Message.create(message);

    res.status(201).json({ status: 'success', data: newMessage });
  } catch (err: any) {
    res.status(403).json({ status: 'fail', error: err.message });
    console.log(red(err));
  }
};

// console.log(green(req.file!.path));
// const result = await cloudinary.uploader.upload(req.file!.path, {
//   upload_preset: 'whatsapp-clone',
// });

// if (req.body.mediaType === 'video') {
//   const result = await cloudinary.uploader.upload(path, {
//     resource_type: 'video',
//     chunk_size: 6000000,
//     eager: [
//       {
//         width: 300,
//         height: 300,
//         crop: 'pad',
//         audio_codec: 'none',
//       },
//       {
//         width: 160,
//         height: 100,
//         crop: 'crop',
//         gravity: 'south',
//         audio_codec: 'none',
//       },
//     ],
//   });
// } else if (req.body.mediaType === 'video') {
//   const result = await cloudinary.uploader.upload(path, {
//     resource_type: 'raw',
//   });
// } else {
//   const result = await cloudinary.uploader.upload(req.file!.path, {
//     resource_type: 'raw',
//   });
// }
