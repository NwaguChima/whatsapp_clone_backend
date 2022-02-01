// import Group Models
import { Request, Response } from 'express';
import { Group } from '../models/GroupModel';
import { CustomRequest } from '../utils/custom';

const getAllGroups = async (req: CustomRequest, res: Response) => {
  try {
    const userLogin = req.user.id;

    // find group where the user.id is present in the members array
    let testLogin = 'abcde';
    const groups = await Group.find({ members: testLogin });

    if (groups.length <= 0) {
      return res.status(404).json({
        message: 'no groups found for this user',
      });
    }
    // filtering the queryObj
    const queryObj = { ...req.query };

    const excludedFields = ['select', 'sort', 'limit', 'page'];
    excludedFields.forEach((el) => delete queryObj[el]);

    console.log(req.query, queryObj);

    res.status(200).json({
      message: 'success',
      size: groups.length,
      data: groups,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getGroup = async (req: CustomRequest, res: Response) => {
  try {
    // first we get the user login id
    const userLogin = req.user.id;

    // find group where the user.id is present in the members array
    let testLogin = 'abcde';
    const groups = await Group.find({ members: testLogin });

    if (groups.length <= 0) {
      return res.status(404).json({
        message: 'no groups found for this user',
      });
    }

    // '5e9f9b8f9b8f9b8f9b8f9b8f
    // find a particular group by its id or its name
    // const group = await Group.find();

    res.status(200).json({
      message: 'success',
      data: 'hello',
    });
    // then we get the group id
    const groupId = req.params.id;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// export the functions
export { getAllGroups, getGroup };
