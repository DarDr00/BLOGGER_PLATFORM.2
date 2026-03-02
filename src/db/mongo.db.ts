import { Collection, Db, MongoClient } from 'mongodb';
import { Post } from '../posts/domain/post';
import { Blog } from '../blogs/domain/blog';
import { SETTINGS } from '../core/settings/settings';
import { User } from '../users/dto/user.service.interface';


const BLOG_COLLECTION_NAME = 'blog';
const POST_COLLECTION_NAME = 'post';
const USER_COLLECTION_NAME = 'user';


export let client: MongoClient;
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;
export let userCollection: Collection<User>;

export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);
    userCollection = db.collection<User>(USER_COLLECTION_NAME);

    try {
    console.log('🔄 Connecting to MongoDB...');  
    await client.connect();
    await db.command({ ping: 1 });
    console.log('✅ Connected to the database');
  } catch (e) {
    await client.close();
    throw new Error(`❌ Database is not connected: ${e}`);
  }
}

export async function stopDb() {
    if (!client) {
        throw new Error (`❌ No active client`);
    }
        await client.close();
    
}