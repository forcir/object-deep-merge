import { existsSync, readdirSync, type Dirent } from "node:fs";
import { dirname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDirectory = "src";
const testDirectory = "tests";

const sourceDirectoryPath = join(__dirname, "..", sourceDirectory);
const testDirectoryPath = join(__dirname, "..", testDirectory);

function getAllFiles(filepath: string): Array<Dirent> {
    const filesAndDirectories = readdirSync(filepath, { withFileTypes: true });
    const files = filesAndDirectories.filter((item) => !item.isDirectory());
    const directories = filesAndDirectories.filter((item) => item.isDirectory());
    const nestedFiles = directories.flatMap(({ path, name: dirname }) => getAllFiles(join(path, dirname)));
    return [...files, ...nestedFiles];
}

function flattenFiles(files: Array<Dirent>): Array<string> {
    return files.map(({ name, path }) => join(path.replace(sourceDirectoryPath, ""), name).replace(/^\/+/, ""));
}

const sourceFiles = flattenFiles(getAllFiles(sourceDirectoryPath));
const expectedTestFiles = sourceFiles.map((file) => {
    const { dir, name, ext } = parse(file);
    return join(dir, `${name}.test${ext}`);
});

test.each(expectedTestFiles)(`Expect test file to exist: <projectRoot>/${testDirectory}/%s`, (input) => {
    expect(existsSync(join(testDirectoryPath, input))).toBe(true);
});
