import express, { Request, Response } from 'express';
import { runDB } from './db/mongo.db'; 
import { setupApp } from './setup-app'; 
import { SETTINGS } from './core/settings/settings'; 


const bootstrap = async () => {
  const app = express();

  setupApp(app);

  const PORT = SETTINGS.PORT;

  await runDB(SETTINGS.MONGO_URL);

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

  return app;
};

bootstrap();