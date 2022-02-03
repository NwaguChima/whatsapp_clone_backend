import express, { Request, Response, NextFunction } from 'express';
import { Message } from '../models/MessageModel';
import { Group } from '../models/GroupModel';

// +Acceptance Criteria:+
// - User can send message to other users(personal chat)
// - User can receive message from other users(personal chat).
// - User can send message to group.
// - User can receive message from group.
