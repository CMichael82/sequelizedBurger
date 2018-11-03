var express = require("express");
var router = express.Router();
var db = require("../models");

//Show all the burgers to devour or that have been devoured//
router.get("/", function (req, res) {
	db.Burger.findAll({}).then(function (data) {
		var hbsObject = {
			burgers: data
		};
		res.render("index", hbsObject);
	});
});

//When the user adds a burger, call the insert function to add to the database//
router.post("/api/burgers", function (req, res) {
	db.Burger.create({
		burger_name: req.body.burger_name
	}).then(function (result) {
		res.json({
			id: result.insertId
		});
	});
});

//When the user clicks the devour button, call the update function to change the state of devoured in the database to TRUE//
router.put("/api/burgers/:id", function (req, res) {
	db.Burger.update({
		devoured: true,
	}, {
		where: {
			id: req.params.id
		}
	}).then(function (result) {
		if (result.changedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});

});

module.exports = router;