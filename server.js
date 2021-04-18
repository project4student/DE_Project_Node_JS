const express = require("express");
const app = express();
const path = require("path");



const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

const viewsPath = path.join(__dirname, "views");
app.set('view engine', 'pug');
app.set('views', viewsPath);

app.get('/', (req, res) => {
	res.render("index");
});


app.get('/signup', (req, res) => {
	let queryParams = req.query;
	res.render('signup', { option: queryParams["signup"] });
});

app.get('/login', (req, res) => {
	let queryParams = req.query;
	res.render('login');
});


app.get("*", (req, res) => {
	res.status(404).send("This page Couldn't be found");
});


app.listen(port);