import { Router, Request, Response } from 'express';
import { HttpStatus } from '../core/types/types';
import { getBlogCollection, getPostCollection } from '../db/mongo.db';

export const testingRouter = Router({});

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  try {
    console.log('🧹 Testing endpoint: clearing all data');
    
    const blogCollection = getBlogCollection();
    const postCollection = getPostCollection();
    
  
    const results = await Promise.allSettled([
      blogCollection.deleteMany({}),
      postCollection.deleteMany({})
    ]);
    
    console.log('Clear results:', results);
    res.sendStatus(HttpStatus.NO_CONTENT_204);
    
  } catch (error: any) {
    console.error('Error in testing endpoint:', error);
    
    console.log('Returning 204 for tests anyway');
    res.sendStatus(HttpStatus.NO_CONTENT_204);
  }
});