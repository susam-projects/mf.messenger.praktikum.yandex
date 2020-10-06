const express = require('express');
const app = express();

const PORT = 4000;
const ROOT_DIR = '__dirname/../static/';

app.use(express.static(ROOT_DIR));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});
