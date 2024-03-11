#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import fs from "fs";

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
    execSync(`git clone --depth 1 ${git_repo} ${projectPath} `);

    process.chdir(projectPath);
    console.log("Installing dependencies...");
    execSync(`pnpm install`);

    console.log("Cleaning junk files");
    execSync(`npx rimraf ./.git`);
    fs.rmSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("Your app is ready!.");
  } catch (err) {
    console.log(err);
  }
};

action();
