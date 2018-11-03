//When the devour it button is clicked update the devoured state to true and reload page to update the devour it/devoured lists. Also, use AJAX to call the update function (changes the state of devoured in the database to TRUE)//
$(function () {
	$(".devour-it").on("click", function (event) {
		var id = $(this).data("id");
		var devouredState = {
			devoured: true
		};

		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: devouredState
		}).then(
			function () {
				console.log("changed devoured state to", devouredState);
				// Reload the page to get the updated list
				location.reload();
			}
		);
	});

	//When the user enters the name of a new burger, add it to the devour it list. ALSO, use AJAX to call the insert function (add to the databas)//
	$("#create-form").on("submit", function (event) {
		event.preventDefault();
		var newBurger = {
			burger_name: $("#newBurger").val()
		};
		console.log(newBurger);
		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger
		}).then(function () {
			console.log("Created New Burger");
			location.reload();
		});
		console.log("You Clicked Me!");
	});
});