const path = require("path");

function rootDir(extraPath = "") {
    return path.resolve(__dirname, "../", extraPath);
}

function srcDir(extraPath = "") {
    return rootDir(`./src${extraPath}`);
}

function distDir(extraPath = "") {
    return rootDir(`./static${extraPath}`);
}

module.exports = {
    rootDir,
    srcDir,
    distDir,
};
