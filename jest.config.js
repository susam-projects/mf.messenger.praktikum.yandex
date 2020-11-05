module.exports = {
    preset: "ts-jest",
    moduleNameMapper: {
        "^(.*)\\.js$": ["$1.js", "$1.ts"],
    },
    testMatch: ["**/?(*.)+(test).ts"],
    setupFiles: ["./jest.setup.js"],
};
