const fs = require('fs');
const path = require('path');

/**
 * @param {string} filePath - The path to the file.
 * @param {string} searchPattern - The RegExp pattern to search for.
 * @param {string} replaceString - The string to replace with.
 */
function replaceLineInFile(filePath, searchPattern, replaceString) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const modifiedContent = fileContent.replace(searchPattern, replaceString);

  fs.writeFileSync(filePath, modifiedContent);
  console.log(`File updated: ${filePath}`);
}

const filePath = path.join(__dirname, 'node_modules', '/next-translate-routes/react/', 'withTranslateRoutes.js');
const searchPattern = /var router_context_1 = require\("next\/dist\/shared\/lib\/router-context"\);/g;
const replaceString = 'var router_context_1 = require("next/dist/shared/lib/router-context.shared-runtime");';
replaceLineInFile(filePath, searchPattern, replaceString);