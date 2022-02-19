const packageJson = require("./package.json");

/**
 * Used for testing the bundled javascript only
 */

export default {
    name: packageJson.name,
    displayName: packageJson.name,
    rootDir: "__test_bundle__"
};
