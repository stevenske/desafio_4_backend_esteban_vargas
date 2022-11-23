const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static('public'));

let routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

routes(app);

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })