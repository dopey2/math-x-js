module.exports = {
    default: [
        `features/**/*.feature`,
        `--require-module ts-node/register`,
        `--require step_definitions/**/*.ts`,
        `--format-options '{"snippetInterface": "synchronous"}'`
    ].join(' '),
};