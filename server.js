//Require express//
var express = require("express");
var app = express();

//Setup PORT and Data Parsing//
var PORT = process.env.PORT || 8080;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var db = require("./models");

//Require & Setup for Handlebars//
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/api-routes.js");

app.use(routes);

//Start SERVER listening//
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
