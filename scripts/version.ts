const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');


/**
 * This script set the version for all package and the version of their interdependency
 *
 * npx tsx-node ./script/version.ts --applyVersion=1.0.0
 */

const argv = yargs(hideBin(process.argv)).option({
    applyVersion: { type: 'string' },
}).argv;

const { applyVersion } = argv;

console.log("applyVersion", applyVersion);

const readJsonFile = (file: string) => {
    let bufferData = fs.readFileSync(file);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    return data;
};

const writeJsonFile = (file: string, content: Object) => {
    let jsonData = JSON.stringify(content, null, 2);
    fs.writeFileSync(file, jsonData);
};

const setPackageAndDependenciesVersion = (version: string) => {
    const packages = './packages/';

    /**
     * Loop through all folder in './packages'
     */
    fs.readdirSync(packages).forEach((folder: string) => {
        const packageJsonPath = `${packages}${folder}/package.json`;
        const packageJson = readJsonFile(packageJsonPath);
        if(packageJson) {
            /**
             * Change package.json version
             */
            if(packageJson.version) {
                packageJson.version = version;
            }

            /**
             * Change the version of any dependencies that match the repo name
             */
            if(packageJson.dependencies) {
                Object.keys(packageJson.dependencies).forEach((dep) => {
                    if(dep.includes("@math-x-ts")) {
                        packageJson.dependencies[dep] = version;
                    }
                });
            }
        }


        writeJsonFile(packageJsonPath, packageJson);
    });
};

if(applyVersion) {
    setPackageAndDependenciesVersion(applyVersion);
}

