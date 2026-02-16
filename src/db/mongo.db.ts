import { Collection, Db, MongoClient } from 'mongodb';
import { Post } from '../posts/types/posts.types';
import { Blog } from '../blogs/types/blogs.types';
import { SETTINGS } from '../core/settings/settings';


const BLOG_COLLECTION_NAME = 'blog';
const POST_COLLECTION_NAME = 'post';

let client: MongoClient;
let db: Db;

export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    await client.connect();
    await client.db(SETTINGS.DB_NAME).command({ ping: 1 });
    db = client.db(SETTINGS.DB_NAME);
    console.log('✅ Connected to the database');
}

export function getBlogCollection(): Collection<Blog> {
    return db.collection<Blog>(BLOG_COLLECTION_NAME);
}

export function getPostCollection(): Collection<Post> {
    return db.collection<Post>(POST_COLLECTION_NAME);
}

export async function stopDb() {
    if (client) {
        await client.close();
    }
}