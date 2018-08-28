//Dependencies
var express = require("express");
var bodyParser = require("body-parser");

//Set up Express App
var app = express();
var PORT = process.env.PORT || 8080;

//Require models
var db = require("./models");

//Set up Express to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Static directory
app.use(express.static("public"));

//Set up Handlebars
var expressHandlebars = require("express-handlebars");

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
require("./routes/api-routes.js")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
});
