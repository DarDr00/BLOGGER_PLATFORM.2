import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/types/types';

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'qwerty';

export const superAdminGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization']; 
  if (!auth) {
    return res.sendStatus(HttpStatus.UNAUTHORIZED_401);
  }

  const [authType, token] = auth.split(' '); 
  if (authType !== 'Basic') {
    return res.sendStatus(HttpStatus.UNAUTHORIZED_401);
  }

  try {
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.sendStatus(HttpStatus.UNAUTHORIZED_401);
    }
    
    next();
  } catch (error) {
    return res.sendStatus(HttpStatus.UNAUTHORIZED_401);
  }
};