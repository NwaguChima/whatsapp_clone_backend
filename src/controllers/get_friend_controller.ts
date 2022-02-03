import { Friend } from '../models/userFriendModel';
// import Group Models
import { Response } from 'express';
import { CustomRequest } from '../utils/custom';


const getFriend = async (req: CustomRequest, res: Response) => {
  try {
    const { _id } = req.user;
    const friends = await Friend.find({ userId: req.user.id });

    if (friends.length <= 0) {
      return res.status(404).json({
        message: `this user has not a member of this group ${name} or this group does not exist`,
      });
    }
    res.status(200).json({
      message: 'success',
      length: friends.length,
      data: friends,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// export the functions
export { getFriend };
