const { symlinkSync, existsSync } = require("node:fs");
const { basename, join, relative, resolve } = require("node:path");

if (process.argv.length !== 3) {
  console.error("Usage: node create_symlink.js <target_file>");
  process.exit(1);
}

const targetFile = process.argv[2];

if (!existsSync(targetFile)) {
  console.error(`Error: Target file "${targetFile}" does not exist.`);
  process.exit(1);
}

const currentFolder = process.env.INIT_CWD;

const docsRoot = join(__dirname, "../");
const linkName = basename(targetFile);

const path = join(currentFolder, linkName);
const relativePath = relative(docsRoot, path);

try {
  symlinkSync(resolve(targetFile), relativePath);
} catch (err) {
  console.error(`Error creating symlink: ${err.message}`);
  process.exit(1);
}

console.info(
  `\x1b[32mSymlink created:\x1b[0m \x1b[34m${relativePath}\x1b[0m -> \x1b[33m${targetFile}\x1b[0m`
);
