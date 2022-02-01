// import Group Models
import { Request, Response } from 'express';
import { Group } from '../models/GroupModel';

const getAllGroups = async (req: Request, res: Response) => {
  try {
    console.log('getAllGroups');
    console.log(Group);
    res.end('he');
    // const groups = await Group.find({});
    // console.log(groups);
    // res.status(200).json({
    //   message: 'success',
    //   data: groups,
    // });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
// export the functions
export { getAllGroups };
