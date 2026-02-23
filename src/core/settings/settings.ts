export const SETTINGS = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 5003,
  MONGO_URL: process.env.MONGO_URL || 
    'mongodb+srv://aleksdarkgrimar_db_user:admin123@mongodblearning.pu9gae2.mongodb.net/3-lesson-mongoDb?appName=mongoDbLearning',
  DB_NAME: process.env.DB_NAME || '3-lesson-mongoDb',
};