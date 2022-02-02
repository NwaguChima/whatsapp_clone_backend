import express, { Request, Response, NextFunction } from 'express';
import { Group } from '../models/GroupModel'
import { validateCreateGroup } from '../utils/validatorUtils';
import { CustomRequest } from '../utils/custom';
import { nanoid } from 'nanoid';


/* This handler creates group for user, set as default, user 
becomes admin on creating group */

export const createGroup = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = validateCreateGroup(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const admin = req.user!.id
        const groupAdmin = [admin]
        const id = nanoid()
        const slug = `http://${req.headers.host}/api/v1/groups/${id}`
        const groupInfo = { id: id, createdBy: admin, members: [admin], slug, groupAdmin, ...req.body }
        const group = await Group.create({ ...groupInfo })
        console.log(group)
        return res.status(201).json({ message: "successful", link: slug })
    } catch (error: any) {
        return res.status(403).json({ error: error.message })

    }
}


/* This handler list all group user belongs to */
export const getAllGroups = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const findGroups = await Group.find({ members: userId }).populate('groupId')
        return res.status(200).json({ allgroups: findGroups })
    } catch (error: any) {
        return res.status(403).json({ error: error.message })

    }
}


/* This handler allows user to add
other people to group created by user */
export const addOthers = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const groupId = req.params.groupId
        const { id } = req.body
        const findGroup = await Group.findOneAndUpdate({ $and:[{groupAdmin: id},{groupId: groupId}] },{$addToSet:{members:[id]}})
        if (!findGroup) {
            return res.status(404).json({ message: 'Not an admin' })
        }
        return res.status(200).json({message:'user added successfully', })
    } catch (error: any) {

    }
}

