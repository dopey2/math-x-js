import baseConfig from '../../jest.config.base';
const packageJson = require("./package.json");

export default {
    ...baseConfig,
    name: packageJson.name,
    displayName: packageJson.name,
    testPathIgnorePatterns: [
        "__test_bundle__"
    ]
};
