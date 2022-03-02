import { Request, Response, NextFunction } from 'express';
import { Friend } from '../models/userFriendModel';
import { Group } from '../models/GroupModel';
import { UserAuth } from '../models/Users';
import { CustomRequest } from '../utils/custom';
import { ReqUser } from '../utils/customReq';

type sand = Request;

export const getAllFriends = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userLogin = req.user!.id;
    const friends = await Friend.find({ userId: userLogin });

    return res.status(200).json({
      status: 'success',
      results: friends.length,
      data: {
        friends,
      },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const addFriend = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    let friendId = '';

    const { email } = req.body;

    const newFriend = await UserAuth.find({ email });
    friendId = newFriend[0]._id;
    if (friendId == userId) {
      return res.status(400).json({
        message: 'user already exist',
      });
    }

    const userFriend = await Friend.find({ userId, friendId });

    if (userFriend.length <= 0) {
      const friend = await Friend.create({ userId, friendId });

      res.status(201).json({
        status: 'success',
        data: {
          friend,
        },
      });
    } else {
      res.status(400).json({
        message: 'friend already exist',
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getFriend = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const friendId = req.params.id;
    const friend = await Friend.find({ userId, friendId });
    console.log(friend);
    const friendDetails = await UserAuth.find({ _id: friendId });
    if (!friend) {
      return res.status(404).json({
        message: 'friend not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        friendDetails,
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// User add to favorite friends array from Friends to UserAuth collection by id

export const addFavoriteFriend = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const friendId = req.params.id;

    const userFriend = await Friend.find({ userId, friendId });
    console.log(userFriend);
    if (userFriend.length <= 0) {
      return res.status(404).json({
        message:
          'Must make them friends first before they can become favourites',
      });
    }
    const user = await UserAuth.findById(userId);

    if (user!.favoriteFriends.includes(friendId)) {
      return res.status(400).json({
        message: 'This friend already exists as a favorite friend',
      });
    }
    user!.favoriteFriends.push(friendId);
    const friendDetails = await UserAuth.findById(friendId);
    await user!.save();

    res.status(201).json({
      status: 'success',
      data: {
        friendDetails,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get user favorite friends array from UserAuth by id

export const getFavoriteFriends = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await UserAuth.findById(userId);
    console.log('in get favorite friends');
    console.log(user);
    if (user) {
      const favoriteFriendsList = user!.favoriteFriends;

      res.status(200).json({
        status: 'success',
        data: {
          favoriteFriendsList,
        },
      });
    } else {
      res.status(400).json({
        message: 'user not exist',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      error: error,
    });
  }
};

export const getFavoriteFriend = async (req: CustomRequest, res: Response) => {
  try {
    // const queryId = req.query.friendId;
    console.log('in get favorite friend');
    const friendId = req.params.id;

    const userId = req.user.id;
    const user = await UserAuth.findById(userId);
    const favoriteId = user!.favoriteFriends.find((id) => id == friendId);

    const friendDetails = await UserAuth.findById(favoriteId);

    if (!user!.favoriteFriends.includes(friendId)) {
      return res.status(400).json({
        message: 'This friend does not exist as a favorite friend',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        friendDetails,
      },
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// User remove from favorite friends array from Friends to UserAuth collection by id

export const removeFavoriteFriend = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const friendId = req.params.id;

    const userFriend = await Friend.find({ userId, friendId });

    const user = await UserAuth.findById(userId);

    if (userFriend.length > 0) {
      if (!user!.favoriteFriends.includes(friendId)) {
        return res.status(400).json({
          message: 'This friend does not exist as a favorite friend',
        });
      }
      const index = user!.favoriteFriends.indexOf(friendId);
      user!.favoriteFriends.splice(index, 1);

      await user!.save();

      res.status(200).json({
        status: 'success',
        data: {
          friendId,
        },
      });
    } else {
      res.status(400).json({
        message: 'friend not exist',
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
