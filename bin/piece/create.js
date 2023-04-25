#! /usr/bin/env node
import inquirer from "inquirer";
import shell from "shelljs";
import readline from "readline";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const piepieceCliPath = path.join(__dirname, "../../");

console.log("Welcome to piepiece-cli");
let name;
let framework;
const options = ["react", "vue"];

await inquirer
  .prompt([
    {
      type: "list",
      name: "option",
      message: "Please select an option:",
      choices: options,
    },
  ])
  .then((answers) => {
    framework = answers.option;
  });
const frameworkPath = piepieceCliPath + `/piece/${framework}`;

// đọc tên project và tạo nó
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the project name: ", (answer) => {
  console.time("pieceCreateRuntime");
  name = answer;
  shell.exec(`yarn create vite ${name} --template ${framework}`);
  // yarn create vite product --template react
  // làm này làm kia để config
  shell.cd(`${name}`);
  shell.cp("-r", frameworkPath + "/vite.config.js", "vite.config.js");

  // giờ sẽ tạo index.js và sao chép nội dung vào
  switch (framework) {
    case "react": {
      // shell.cat(frameworkPath + "/App.jsx").to("src/App.jsx");
      shell.cat(frameworkPath + "/main.jsx").to("src/main.jsx");
      shell.cat(frameworkPath + "/index.jsx").to("src/index.jsx");
      shell.cat(frameworkPath + "/App.css").to("src/App.css");

      shell.rm("./src/index.css");
      // shell.rm("./src/App.jsx");
      shell.exec("yarn add react-router-dom");
    }
    case "vue": {
      shell.cat(frameworkPath + "/index.jsx").to("src/index.jsx");
    }
  }
  shell.exec(
    "yarn add @originjs/vite-plugin-federation && @vitejs/plugin-vue --save --dev"
  );
  shell.exec("yarn link piepiece-cli");
  shell.echo("Installation completed successfully!!!");
  console.timeEnd("pieceCreateRuntime");
  rl.close();
});
