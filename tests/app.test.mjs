import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Login', async ({ browser }) => {
  const videoDir = path.resolve('videos');
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir);

  const context = await browser.newContext({
    recordVideo: { 
      dir: videoDir,       
      size: { 
        width: 1280, 
        height: 720 
      }
    }
  });

  const page = await context.newPage();

  await page.goto('http://localhost:3000/login');
  await page.waitForTimeout(1000);

  await page.fill('#email', 'test@example.com');
  await page.waitForTimeout(1000); 
  
  await page.fill('#password', 'password123');
  await page.waitForTimeout(1000); 
  
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000); 

  await context.close();

  const videoPath = await page.video().path();
  const finalVideoPath = path.join(videoDir, 'login.mp4');
  fs.renameSync(videoPath, finalVideoPath);
});
