import express from 'express';
import { setupApp } from './src/setup-app';

const app = express();
setupApp(app);

console.log('\n=== ДИАГНОСТИКА ===\n');

// 1. Проверим все middleware
app._router.stack.forEach((layer: any, i: number) => {
  console.log(`[${i}] ${layer.name || 'unnamed'}`);
  
  if (layer.route) {
    console.log(`   ROUTE: ${Object.keys(layer.route.methods)} ${layer.route.path}`);
  }
  
  if (layer.name === 'router' && layer.regexp) {
    console.log(`   ROUTER mounted at pattern: ${layer.regexp}`);
    
    // Проверим routes внутри router
    if (layer.handle && layer.handle.stack) {
      layer.handle.stack.forEach((handler: any, j: number) => {
        if (handler.route) {
          console.log(`     -> ${Object.keys(handler.route.methods)} ${handler.route.path}`);
        }
      });
    }
  }
});
