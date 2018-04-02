const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const request = require("request");
const db = require("./app/models");
const exphbs = require("express-handlebars")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoHeadliner");

require("./app/routes/html-routes.js")(app);
require("./app/routes/api-routes.js")(app);

// request("http://www.nintendolife.com/", function(err, res, html) {
// 	const $ = cheerio.load(html);
// 	$("li.item-article").each(function(i, element) {
// 		const results = {};
// 		const title = $(element).find("span.title").text();
// 		const link = $(element).find("a.title").attr("href");
// 		const description = $(element).find("p.text").text();

// 		results.title = title;
// 		results.link = link;
// 		results.description = description;

// 		db.Article.create(results)
// 		.then(function(dbArticle) {
// 			console.log(dbArticle);
// 		})
// 		.catch(function(err) {
// 			return res.json(err);
// 		})
// 	})
// })


app.listen(PORT, function() {
	console.log("listening to port " + PORT);
})