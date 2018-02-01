/* 
	Code by Kim Pettersson. 
	Free to use but be nice and ref to me then.
	https://www.facebook.com/kipe91, 
	https://www.instagram.com/kimp3tt3rsson.
*/

// -------------- Objects ---------------------------

// Setting up my Grid object.
var myGrid = {
    //defaultHeight : 15,
	//defaultWidth : 15,
	color: "#fff",
	pixelSize: 20,
	paintSize: 1,
	//isSet : 0,
};

// -------------- Clean up ----------------------
function removeGrid() {
		"use strict";
       	var removeTR, removeIMG, removeBR, removeP;
		removeTR = $('#pixel_canvas').find("tr");
		removeTR.remove();
		removeIMG = $('#pixel_canvas').find("img");
		removeIMG.remove();
		removeBR = $('#pixel_canvas').find("br");
		removeBR.remove();
		removeP = $('.right_cell').find("p");
		removeP.remove();
    }

// -------------- PixelGrid function ----------------------

// Here is where magic happens ;)
function pixelGrid() {
	"use strict";
	// Remove old grid.
	removeGrid();
	
	// Defining variables.
	var pixelTable, gridHeight, gridWidth;
	pixelTable = $('#pixel_canvas');
	
	// Setting up values for size.
	gridHeight = $('#input_height').val();
	gridWidth = $('#input_width').val();
	/* if (myGrid.isSet === 0) {
		gridHeight = myGrid.defaultHeight;
		gridWidth = myGrid.defaultWidth;
		
		$('#input_height').val(gridHeight);
		$('#input_width').val(gridWidth);
	}
	else {
		gridHeight 	= 	$('#input_height').val();
		gridWidth 	= 	$('#input_width').val();
	} */

	// Create grid using for loop.
	for (var i = 0; i < gridHeight; i++) {
		// Add rows / tr.
		var simpleTR = $('<tr></tr>');
		pixelTable.append(simpleTR);
		
		// Add pixels / td.
		for (var j = 0; j < gridWidth; j++) {
			simpleTR.append("<td></td>");
		}
	}
	
	// changing all tr / td to right size.
	//if (myGrid.isSet === 1) {
	pixelTable.find("tr").css("height", myGrid.pixelSize);
	pixelTable.find("tr").css("min-height", myGrid.pixelSize);
	pixelTable.find("td").css("width", myGrid.pixelSize);
	pixelTable.find("td").css("min-width", myGrid.pixelSize);
	//}

	hoverClick();
}

// -------------- Hover and click function ----------------------

function hoverClick() {

	var pixelTable = $('#pixel_canvas');
	
	// Change color when clicked.
	pixelTable.find('td').click(function() {
		$(this).css('background-color', myGrid.color);
	});

	// Hover function.
	pixelTable.find("td").hover(function() {
  		$(this).fadeTo(10, 0.6);
  	},function() {
  		$(this).fadeTo(10,1);
  		}	
	);
}

// -------------- Change game functions ------------------------

var game1 = $("#pixelGame");
var game2 = $("#memoryGame");
var gameHeader = $("h1");

function changeToMemory() {
	game1.css("display", "none");
	game2.css("display", "block");
	gameHeader.text("Memory Game");
}

function changeToPixel() {
	game1.css("display", "block");
	game2.css("display", "none");
	gameHeader.text("Pixel Art Maker");
}

// -------------- MemoryGrid function ------------------------

function memoryGrid(num) {
	"use strict";
	// Remove old grid.
	removeGrid();

	// Fix variables
	var pixelTable = $('#pixel_canvas');
	var split, fullCards;

	// Create array with all cards and a small array with "this game cards".
	fullCards = [
	"blue-dark", "blue-dark", "orange", "orange", "red", "red", 
	// 6 cards and 3 pairs.
	"green", "green", "yellow", "yellow", "black", "black",
	// 12 cards and 6 pairs.
	"purple", "purple", "pink", "pink", "gold", "gold",
	// 18 cards.
	"brown", "brown", "blue-light", "blue-light", "grey", "grey"
	// 24 cards and 12 pairs.
	];
	var gameCards = [];
	for (var ii = 0; ii < num; ii++) {
	gameCards.push(fullCards[ii]);
	}

	// calc for the "for" loop.
	if (num === 24) {
		split = 4;
	}
	else if (num === 12) {
		split = 3;
	}
	else {
		split = 2;
	}
	var number = num / split;
	var count = 1;

	// Create grid using for loop.
	for (var k = 1; k <= split; k++) {
		for (var m = 1; m <= number; m++) {
			// Pick random card.
			var rand = gameCards[Math.floor(Math.random() * gameCards.length)];
			// Create that card to website.
			var pic = "<img src=\"cards/memory_front.jpg\" alt=\"card_nr_" + count + "\" value=\"" + rand + "\">";
			pixelTable.append(pic);
			count++;
			// Remove card from deck when on website.
			var index = gameCards.indexOf(rand);
			gameCards.splice(index, 1);
		}
		// New row.
		pixelTable.append("<br>");
	}

	// Turn/change card to its color and make it class-"marked".
	var classesCheck = 0;
	pixelTable.find("img").click(function() {
		var newSource = "cards/memory_" + $(this).attr("value") + ".jpg";
		$(this).attr("src", newSource);
		// mark target.
		if (classesCheck === 0) {
			if ($(this).attr("class") === "finnished") {
				//do nothing...
			}
			else {
				$(this).addClass("marked1");
				classesCheck = 1;
			}
		}
		else {
			if ($(this).attr("class") === "finnished") {
				//do nothing...
			}
			else if ($(this).attr("class") === "marked1") {
				//do nothing.. to stop player from dubbel click same card.
			}
			else {
				$(this).addClass("marked2");
				letsCheck();
			}
		}
	});

	// Look for "class=marked" to see if it match.
	function letsCheck() {
		// add delay to 1 sec so you can see what color you clicked.
		setTimeout(function(){
		
		var marked1 = $(".marked1");
		var marked2 = $(".marked2");
		if (marked1.attr("value") === marked2.attr("value")) {
			marked1.addClass("finnished");
			marked2.addClass("finnished");
			marked1.removeClass("marked1");
			marked2.removeClass("marked2");
		}
		else {
			marked1.attr("src", "cards/memory_front.jpg");
			marked2.attr("src", "cards/memory_front.jpg");
			marked1.removeClass("marked1");
			marked2.removeClass("marked2");
		}
		classesCheck = 0;
		isAllDone();
		
		}, 1000);
	}

	// Check if all cards is "finnished" to end game.
	function isAllDone() {
		var allDone = $(".finnished");
		if (num === allDone.length) {
			var rightCell = $(".right_cell");
			rightCell.append("<p>Yes you did it! Good work</p>");
		}
	}
}

// -------------- On Start up ------------------------------

// Creating default grid and adding eventlisteners.
$(function() {
	"use strict";
	//pixelGrid();

	$('#sizePicker').submit(function() {
		event.preventDefault();
		//myGrid.isSet = 1;
		pixelGrid();
	});

	// Start memory with 6, 12 or 24 cards.
	$('#memory6_btn').click(function() {
		event.preventDefault();
		memoryGrid(6);
	});
	$('#memory12_btn').click(function() {
		event.preventDefault();
		memoryGrid(12);
	});
	$('#memory24_btn').click(function() {
		event.preventDefault();
		memoryGrid(24);
	});

	// 2 buttons to change game/left side.
	$('#memoryGame_btn').click(function() {
		event.preventDefault();
		changeToMemory();
	});
	$('#pixelGame_btn').click(function() {
		event.preventDefault();
		changeToPixel();
	});

	// Awesome checkbox / colorpicker function.
	$("input:checkbox").on('click', function() {
		var $box = $(this);
		if ($box.is(":checked")) {
	    	// The name of the box is retrieved using the .attr() method
	    	// as it is assumed and expected to be immutable.
	    	var group = "input:checkbox[name='" + $box.attr("name") + "']";
	    	// The checked state of the group/box on the other hand will change
	    	// and the current value is retrieved using .prop() method.
	    	$(group).prop("checked", false);
	    	$box.prop("checked", true);
	    	// After that... match the value from the box with the correct 
	    	// color id to change the color in to that.
	    	var checkThis = $box.val();
	  		myGrid.color = $(checkThis).val();	
	  } else {
	    	$box.prop("checked", false);
	  }
	});


	// Pixel zoom in/out function.
	$('#input_size').change(function() {
		var thePixel = $("#pixel_fix");
		var allPixel = $("#pixel_canvas");
		myGrid.pixelSize = $(this).val();
		// Update the "pixel_fix".
		thePixel.find("tr").css("height", myGrid.pixelSize);
		thePixel.find("td").css("width", myGrid.pixelSize);
		//Update pixel table size.
		allPixel.find("tr").css("height", myGrid.pixelSize);
		allPixel.find("tr").css("min-height", myGrid.pixelSize);
		allPixel.find("td").css("width", myGrid.pixelSize);
		allPixel.find("td").css("min-width", myGrid.pixelSize);
	});


	// Pencil size function.
	/* $("#sliderValue").change(function() {
		var paintValue = $("#sliderValue").val();
		var paintSlider = $("#sliderSpot").find("i");
		if (paintValue === "2") {
			paintSlider.text("2");
			myGrid.paintSize = 2;
		}
		else if (paintValue === "3") {
			paintSlider.text("4");
			myGrid.paintSize = 4;
		}
		else if (paintValue === "4") {
			paintSlider.text("9");
			myGrid.paintSize = 9;
		}
		else {
			paintSlider.text("1");
			myGrid.paintSize = 1;
		}
	}) */

});