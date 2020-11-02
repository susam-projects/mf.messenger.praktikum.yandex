module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^(.*)\\.js$": ["$1.js", "$1.ts"],
    },
    testMatch: ["**/?(*.)+(test).ts"],
};
