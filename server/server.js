const express = require("express");
const path = require("path");
const app = express();

const PORT = 4000;
const ROOT_DIR = `${__dirname}/../static/`;

app.use(express.static(ROOT_DIR));
app.use(alwaysSendIndex);

function alwaysSendIndex(res, req) {
    req.sendFile(path.resolve(`${ROOT_DIR}index.html`));
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});
