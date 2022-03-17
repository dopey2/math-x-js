module.exports = {
    default: [
        `features/**/*.feature`,
        `--require-module ts-node/register`,
        `--require features/**/*.ts`,
        `--format-options '{"snippetInterface": "synchronous"}'`
    ].join(' '),
};