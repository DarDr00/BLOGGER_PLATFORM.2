import express, { Express } from "express";
import { testingRouter } from "./testing/testing.router";
import { TESTING_PATH } from "./core/path/paths";
import postsRouter from "./posts/routers/posts.router";
import { POSTS_PATH } from "./core/path/paths";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { BLOGS_PATH } from "./core/path/paths";
 
export const setupApp = (app: Express) => {
  app.use(express.json());

  console.log('Подключаем роутеры:');
  console.log('- TESTING_PATH:', TESTING_PATH);
  console.log('- BLOGS_PATH:', BLOGS_PATH);
  console.log('- POSTS_PATH:', POSTS_PATH);

  app.use(TESTING_PATH, testingRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);

  app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
  });

  app.use((req, res, next) => {
    console.log('❌ [404 Handler] Запрос не найден!');
    console.log('❌ [404 Handler] URL:', req.url);
    console.log('❌ [404 Handler] Method:', req.method);
    res.status(404).json({ error: 'Not Found', url: req.url });
  });

  return app;
};