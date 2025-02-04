const {
  symlinkSync,
  existsSync,
  readFileSync,
  writeFileSync,
} = require("node:fs");
const { basename, join, relative } = require("node:path");

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

const linkPath = join(currentFolder, linkName);
const relativeLinkPath = relative(docsRoot, linkPath);

const relativeTargetPath = relative(currentFolder, targetFile);

function run() {
  try {
    symlinkSync(relativeTargetPath, relativeLinkPath);
  } catch (err) {
    console.error(`Error creating symlink: ${err.message}`);
    process.exit(1);
  }
  syncArgohubRedirectMap(targetFile, relativeLinkPath);
  console.info(
    `\x1b[32mSymlink created:\x1b[0m \x1b[34m${relativeLinkPath}\x1b[0m -> \x1b[33m${targetFile}\x1b[0m`
  );
}

function syncArgohubRedirectMap(
  enterpriseCollectionPath,
  argoHubCollectionPath
) {
  const filePath = join(
    __dirname,
    "../assets/js/src",
    "argohub-redirect-mapping.json"
  );
  const data = readFileSync(filePath, "utf8");

  const enterpriseDoc = transformPathToDocURL(enterpriseCollectionPath);
  const argohubDoc = transformPathToDocURL(argoHubCollectionPath);

  const redirectMapping = JSON.parse(data);
  redirectMapping[enterpriseDoc] = argohubDoc;

  const updatedData = `${JSON.stringify(redirectMapping, null, 2)}\n`;
  writeFileSync(filePath, updatedData, "utf8");

  console.log(
    "The 'argohub-redirect-mapping.json' file has been updated successfully."
  );
}

function transformPathToDocURL(path) {
  return path.replace("_", "/").replace(".md", "/");
}

run();
