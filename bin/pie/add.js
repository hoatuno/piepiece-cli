#! /usr/bin/env node
import shell from "shelljs";
const name = process.argv[2];
const fileConfig = "vite.config.js";
import path from "path";

const pathName = path.basename(shell.pwd().stdout);
const ResolveAliasString = `\tresolve: {
    alias: [
      { find: "${name}", replacement: "${name}/dist/${name}.js" },
    ],
  },`;
const aliasString = `\t\t{ find: "${name}", replacement: "${name}/dist/${name}.js" },`;
const RegexPiece = /{ find: [^]*" }/;
const RegexPieces = /find: [^]*",/;
const RegexDuplicate = `find: "${name}",`;
const RegexFirstAlias = /alias: \[/;

// build piece
shell.cd(`../${name}`);
shell.exec(`yarn && yarn build`);
shell.cd(`../${pathName}`);

// setup alias for vite.config.js
//   count number of pieces, true with pieces > 1
const findPieces = shell.grep(RegexPieces, fileConfig).stdout;
const countPieces = findPieces.split(/\n/).length - 1;
const piece = shell.grep(RegexPieces, fileConfig).stdout.match(RegexPieces);
const duplicate = shell
  .grep(RegexDuplicate, fileConfig)
  .stdout.match(RegexDuplicate);
switch (true) {
  case duplicate !== null: {
    console.log("Duplicate piece");
    break;
  }
  case countPieces > 0 && piece !== null: {
    console.log("case 1");
    shell.sed("-i", RegexFirstAlias, `$&\n\t` + aliasString, fileConfig);
    break;
  }
  default: {
    console.log("case 0");
    shell.sed("-i", /()],/, `$&\n` + ResolveAliasString, fileConfig);
    break;
  }
}

// install package
shell.exec(`yarn i file:../${name}`);
