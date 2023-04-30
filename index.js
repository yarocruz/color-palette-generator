const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const getColors = require('./helpers/get-colors');

//app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

});

app.post('/generate', async (req, res) => {
    const prompt = req.body.query
    const colors = await getColors(prompt)
    res.json({ "colors": JSON.parse(colors) })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});