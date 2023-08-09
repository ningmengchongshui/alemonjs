#!/usr/bin/env node

import prompts from "prompts";
import { existsSync, mkdirSync } from "fs";
import { copy } from "fs-extra";
import { spawn } from "child_process";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "node:url";

async function runNpmCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { shell: true });

    child.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    child.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Command "${command}" failed with exit code ${code}`));
      } else {
        resolve("");
      }
    });
  });
}

prompts([
  {
    type: "text",
    name: "name",
    message: "robot name:",
    validate: async (value: any) => {
      if (existsSync(`./${value}`)) return "Robot name already exists!";
      return /^[a-z][0-9a-z_-]{0,}$/.test(value)
        ? true
        : "首字母小写,可选符号数字、小写字母、_和-";
    },
    initial: process.argv[3] ? process.argv[3] : "alemon-bot",
  },
])
  .then(async ({ name }) => {
    // 强制退出错误
    if (!name) process.exit();
    const dirPath = `./${name}`;
    mkdirSync(dirPath);
    console.log(`\n`);

    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);
    try {
      const alemonCliPath = resolve(currentDirPath);
      const templatePath = join(alemonCliPath, "template");
      await copy(templatePath, dirPath);
      process.chdir(dirPath);
      await runNpmCommand("npm", ["install"]);
      console.log(`------------------------------------`);
      console.log("---alemon-Bot cloned successfully!--");
      console.log(`------------------------------------`);
      console.log(`cd ${name}      #Entering`);
      console.log(`npm run app:qq     #启动qq频道机器人`);
      console.log(`npm run app:dc     #启动discord机器人`);
      console.log(`npm run app:mys    #启动大别野机器人`);
      console.log(`------------------------------------`);
    } catch (error) {
      console.log(`${name} ${error}`);
      return;
    }
  })
  .catch((err) => {
    console.log(err);
    return;
  });
