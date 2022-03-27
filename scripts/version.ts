const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');


const argv = yargs(hideBin(process.argv)).option({
    applyVersion: { type: 'string' },
}).argv;

const { applyVersion } = argv;

const readJsonFile = (file: string) => {
    let data = null;
    try {
        let bufferData = fs.readFileSync(file);
        let stData = bufferData.toString();
        data = JSON.parse(stData);
    }catch (err) {}
    return data;
};

const writeJsonFile = (file: string, content: Object) => {
    let jsonData = JSON.stringify(content, null, 2);
    fs.writeFileSync(file, jsonData);
};

/**
 * Given a directory, set the version and dependencies version of the package.json in that directory
 *
 * @param {string} path
 * @param version
 * @param {boolean} shouldSetDepVersion If true set also the dependencies version
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

