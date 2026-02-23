import { Router, Request, Response } from 'express';
import { HttpStatus } from '../core/types/types';
import { blogCollection, postCollection } from '../db/mongo.db';

export const testingRouter = Router({});

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  try {
    await postCollection.deleteMany({});
   
    await blogCollection.deleteMany({});
    
    await new Promise(resolve => setTimeout(resolve, 50));
    
    res.sendStatus(HttpStatus.NO_CONTENT_204);
  } catch (error) {
    console.error('Testing cleanup failed:', error);
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500);
  }
});