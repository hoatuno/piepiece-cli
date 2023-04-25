#! /usr/bin/env node
import inquirer from "inquirer";
import shell from "shelljs";
import readline from "readline";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const piepieceCliPath = path.join(__dirname, "../../");

console.log("Choose a frameworks for Pie");
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the project name: ", (answer) => {
  console.time("pieCreateRuntime");
  name = answer;
  shell.exec(`yarn create vite ${name} --template ${framework}`);
  shell.cd(`${name}`);
  if (framework === "react") {
    //init for main set up
    shell.cat(piepieceCliPath + "pie/react/App.jsx").to("src/App.jsx");
    shell.cat(piepieceCliPath + "pie/react/main.jsx").to("src/main.jsx");
    shell
      .cat(piepieceCliPath + "pie/react/vite.config.js")
      .to("vite.config.js");
    shell
      .cat(piepieceCliPath + "pie/react/piece_react.jsx")
      .to("src/piece_react.jsx");
    shell.rm("./src/App.css");
    shell.rm("./src/index.css");
    shell.exec("yarn add @originjs/vite-plugin-federation --save --dev");
    shell.exec("yarn link piepiece-cli");
    shell.exec("yarn add react-router-dom");
    shell.echo("Pie with React is created successfully!!!");
  }
  if (framework === "vue") {
    // init for vue set up
    shell.cat(piepieceCliPath + "pie/vue/App.vue").to("src/App.vue");
    shell.cat(piepieceCliPath + "pie/vue/vite.config.js").to("vite.config.js");
    shell.cat(piepieceCliPath + "pie/vue/main.js").to("src/main.js");
    shell.rm("./src/style.css");
    shell.rm("-rf", "./src/components");

    shell.mkdir("src/routers");
    shell
      .cat(piepieceCliPath + "pie/vue/routers/router.js")
      .to("src/routers/router.js");
    shell
      .cat(piepieceCliPath + "pie/vue/routers/Home.vue")
      .to("src/routers/Home.vue");
    shell
      .cat(piepieceCliPath + "pie/vue/routers/About.vue")
      .to("src/routers/About.vue");
    shell
      .cat(piepieceCliPath + "pie/vue/routers/piece_react.jsx")
      .to("src/routers/piece_react.jsx");

    shell.exec("yarn add @originjs/vite-plugin-federation --save --dev");
    shell.exec("yarn link piepiece-cli");
    shell.exec("yarn add vue-router@4");
    shell.echo("Pie with vue is created successfully!!!");
  }
  console.timeEnd("pieCreateRuntime");
  rl.close();
});
