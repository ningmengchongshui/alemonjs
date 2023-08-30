#!/usr/bin/env node

import prompts from 'prompts';
import { existsSync, mkdirSync } from 'fs';
import fs from 'fs';
import { execSync } from 'child_process';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'node:url';

const args = process.argv;

async function createAlemon({ name, force = false }) {
  // 错误参数
  if (!name) process.exit();
  // 锁定位置
  const dirPath = `./${name}`;

  // 如果f为真,不敢存不存在,直接

  // 已经存在目录
  if (existsSync(dirPath)) {
    if (!force) {
      console.log('Robot name already exists!');
      return;
    }
    fs.rmSync(dirPath, { recursive: true }); // 强制删除已存在的文件或目录
  }

  // 没有存在
  mkdirSync(dirPath, { recursive: true });
  console.log('\n');
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = dirname(currentFilePath);
  try {
    const alemonCliPath = resolve(currentDirPath);
    const templatePath = join(alemonCliPath, 'template');
    console.log('Copying template...');
    fs.cpSync(templatePath, dirPath, { recursive: true });
    process.chdir(dirPath);
    console.log('Loading dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    console.log(`------------------------------------`);
    console.log('Alemon-Bot cloned successfully!');
    console.log(`------------------------------------`);
    console.log(`cd ${name}      #进入机器人目录`);
    console.log(`npm run app:qq     #启动qq频道机器人`);
    console.log(`npm run app:dc     #启动discord机器人`);
    console.log(`npm run app:mys    #启动villa机器人`);
    console.log(`npm run app:kook    #启动KOOK机器人`);
  } catch (error) {
    console.log(`${name} ${error}`);
    return;
  }
}

if (!args[2]) {
  createAlemon({ name: 'alemon-bot' });
}

if (args[2]) {
  const BotName = args[2];
  if (!args[3]) {
    createAlemon({ name: BotName });
  }
  if (args[3]) {
    switch (args[3]) {
      // 强制覆盖  不管存不存在,直接覆盖
      case 'f': {
        createAlemon({ name: BotName, force: true });
        break;
      }
      // 想重输入
      case 'd': {
        prompts([
          {
            type: 'text',
            name: 'name',
            message: 'robot name:',
            validate: async (value: any) => {
              if (existsSync(`./${value}`)) return 'Robot name already exists!';
              return /^[a-z][0-9a-z_-]{0,}$/.test(value)
                ? true
                : '首字母小写,可选符号数字、小写字母、_和-';
            },
            initial: 'alemon-bot'
          }
        ])
          .then(createAlemon)
          .catch(err => {
            console.log(err);
            return;
          });
        break;
      }
      default: {
        console.log('无效参数~');
        break;
      }
    }
  }
}
