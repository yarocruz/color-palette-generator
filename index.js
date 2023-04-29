const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});