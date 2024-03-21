#!/usr/bin/env node

import { exec } from "child_process";
import path from "path";
import fs from "fs";
import ora from "ora";
import util from "util";

const promiseExec = util.promisify(exec);

async function cloneRepo(git_repo, projectPath) {
  const spinner = ora("Downloading files");
  spinner.start();

  try {
    const { stdout, stderr } = await promiseExec(`git clone --depth 1 ${git_repo} ${projectPath} `);
    console.log(stdout);
  } finally {
    spinner.succeed();
  }
}

async function installDeps(projectPath) {
  const spinner = ora("Installing dependencies");
  spinner.start();
  try {
    process.chdir(projectPath);
    const { stdout: installOut, stderr: installErr } = await promiseExec(`npm install`);
    console.log(installOut);
  } finally {
    spinner.succeed();
  }
}

async function cleaning(projectPath) {
  const spinner = ora("Cleaning junk files");
  spinner.start();
  try {
    const { stdout, stderr } = await promiseExec(`npx rimraf ./.git`);
    await fs.rmSync(path.join(projectPath, "bin"), { recursive: true });
    console.log(stdout);
    const { stdout: uninstallOut, stderr: uninstallErr } = await promiseExec(
      `npm uninstall rimraf cli-spinners ora`
    );
    console.log(uninstallOut);
  } finally {
    spinner.succeed();
  }
}

const spinner = ora();

if (process.argv.length < 3) {
  console.log("Provide name of your app.");
  console.log("For example - ");
  console.log("   npx create-parcel-react-template myApp");
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
    await cloneRepo(git_repo, projectPath);
    await installDeps(projectPath);
    await cleaning(projectPath);
  } catch (err) {
    console.log(err);
  }
};

action();
