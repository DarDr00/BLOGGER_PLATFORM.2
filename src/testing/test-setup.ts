import { runDB, stopDb } from '../db/mongo.db';
import { SETTINGS } from '../core/settings/settings';

let isDBInitialized = false;

export async function setupTestDB() {
  if (!isDBInitialized) {
    await runDB(SETTINGS.MONGO_URL);
    isDBInitialized = true;
  }
}

export async function teardownTestDB() {
  await stopDb(); 
}