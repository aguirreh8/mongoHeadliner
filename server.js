const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");


const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static('public'));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoHeadliner");

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


app.listen(PORT, function() {
	console.log("listening to port " + PORT);
})