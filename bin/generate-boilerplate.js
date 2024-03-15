#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import cliSpinners from "cli-spinners";
import ora from "ora";

const spinner = ora();

if (process.argv.length < 3) {
  console.log("Provide name of your app.");
  console.log("For example - ");
  console.log("   npx create-parcel-react-boilerplate myApp");
  process.exit(1);
}

//Last argument is app name
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/SiddharthaMishra-dev/create-parcel-react-app.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `Folder ${projectName} already exists in current directory, please rename your folder and try again.`
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

const action = async () => {
  try {
    console.log(`Downloading files`);
    spinner.start();
    await execSync(`git clone --depth 1 ${git_repo} ${projectPath} `);
    process.chdir(projectPath);
    spinner.stop();
    console.log(`Installing dependencies`);
    spinner.start();
    execSync(`pnpm install`);
    spinner.stop();
    console.log(`Cleaning junk files`);
    spinner.start();
    execSync(`npx rimraf ./.git`);
    fs.rmSync(path.join(projectPath, "bin"), { recursive: true });
    spinner.stop();

    console.log("Your app is ready!.");
    spinner.succeed();
  } catch (err) {
    console.log(err);
  }
};

action();
