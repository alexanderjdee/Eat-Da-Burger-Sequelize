var db = require("../models");

module.exports = function(app){
    app.get("/", function(request, response){
        db.Burger.findAll({}).then(function(dbBurger){
            var handlebarsObject = {
                burgers: dbBurger
            };
            response.render("index", handlebarsObject);
        });
    });
    
    app.post("/api/burgers", function(request, response){
        db.Burger.create({
            name: request.body.name
        }).then(function(dbBurger){
            response.json({id: dbBurger.insertId});
        });
    });
    
    app.put("/api/burgers/:id", function(request, response){
        db.Burger.update({
            devoured: request.body.devoured
        }, {where: {id: request.params.id}}).then(function(dbBurger){
            response.json(dbBurger);
        });
    });
}