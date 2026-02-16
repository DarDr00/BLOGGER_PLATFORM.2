import express, { Request, Response } from 'express';
import { runDB } from './db/mongo.db'; 
import { setupApp } from './setup-app'; 
import { SETTINGS } from './core/settings/settings'; 


const app = express();
app.use(express.json());
setupApp(app);


if (require.main === module) {
  const startApp = async () => {
    try {
      await runDB(SETTINGS.MONGO_URL);
      app.listen(SETTINGS.PORT, () => {
        console.log(`✅ Blog API running on port ${SETTINGS.PORT}`);
      });
    } catch (error) {
      console.error('❌ Failed to start application:', error);
      process.exit(1);
    }
  };
  startApp();
}

export default app;