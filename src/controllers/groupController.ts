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
        const id = nanoid()
        const slug = `http://${req.headers.host}/api/v1/groups/${id}`
        const groupInfo = { id: id, createdBy: admin, members: [admin], slug, ...req.body }
        const group = await Group.create({ ...groupInfo })
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
        const findGroups = await Group.find({ members: userId })
        res.status(200).json({ allgroups: findGroups })
    } catch (error: any) {
        return res.status(403).json({ error: error.message })

    }
}


/* This handler allows user to add
other people to group created by user */

