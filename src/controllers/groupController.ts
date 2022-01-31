import express, { Request, Response, NextFunction } from 'express';
import {Group} from '../models/GroupModel'
import { validateCreateGroup } from '../utils/validatorUtils';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { CustomRequest } from '../utils/custom';


//This handler creates group 
export const createGroup = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    console.log(req.user!)
    const { error } = validateCreateGroup(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }else{
        const admin = req.user!.id
        const slug = 
        const groupInfo = {...req.body, createdBy:admin, members:[admin]}
        const group = await Group.create({...groupInfo})

    }



}