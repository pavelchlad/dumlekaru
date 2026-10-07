import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HtmlValidate } from "html-validate";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirectories = new Set([".git", "node_modules"]);
const validator = new HtmlValidate({
  extends: ["html-validate:recommended"],
  rules: {
    "doctype-style": "off",
    "doctype-html": "off",
    "no-trailing-whitespace": "off",
    "void-style": "off",
    "no-inline-style": "off",
    "no-implicit-button-type": "off",
    "unique-landmark": "off",
    "wcag/h30": "off",
    "wcag/h37": "off",
  },
});

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...(await findHtmlFiles(fullPath)));
      }
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await findHtmlFiles(root);
let errorCount = 0;

for (const file of files) {
  const source = await readFile(file, "utf8");
  const relativePath = path.relative(root, file);
  const markerPattern = /\[\.\.\.\]/g;
  let match;

  while ((match = markerPattern.exec(source)) !== null) {
    const line = source.slice(0, match.index).split("\n").length;
    console.error(`${relativePath}:${line}: forbidden truncation marker "[...]"`);
    errorCount++;
  }

  const report = await validator.validateFile(file);

  for (const result of report.results) {
    for (const message of result.messages) {
      console.error(
        `${relativePath}:${message.line}:${message.column}: ${message.message} (${message.ruleId})`,
      );
      errorCount++;
    }
  }
}

if (errorCount > 0) {
  console.error(`HTML validation failed with ${errorCount} error(s).`);
  process.exitCode = 1;
} else {
  console.log(`HTML validation passed for ${files.length} file(s).`);
}
