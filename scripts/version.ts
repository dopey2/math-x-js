const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

const argv = yargs(hideBin(process.argv)).option({
    applyVersion: { type: 'string' },
}).argv;

const { applyVersion } = argv;

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

/**
 *
 * @param {string} path
 * @param version
 * @param {boolean} shouldSetDepVersion If tru
 */
const setPackageAndDependenciesVersion = (path: string, version: string, shouldSetDepVersion = true) => {
    const packageJsonPath = `${path}/package.json`;
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
        if(shouldSetDepVersion && packageJson.dependencies) {
            Object.keys(packageJson.dependencies).forEach((dep) => {
                if(dep.includes("@math-x-ts")) {
                    packageJson.dependencies[dep] = version;
                }
            });
        }
    }

    writeJsonFile(packageJsonPath, packageJson);
};

const setPackagesVersion = (version: string) => {
    const packages = './packages/';

    /**
     * Loop through all folder in './packages'
     */
    fs.readdirSync(packages).forEach((folder: string) => {
        const packageJsonPath = `${packages}${folder}`;
        setPackageAndDependenciesVersion(packageJsonPath, version);
    });

    /**
     * Set the version in the root package.json
     */
    setPackageAndDependenciesVersion('.', version, false);
};


if(applyVersion) {
    setPackagesVersion(applyVersion);
}

