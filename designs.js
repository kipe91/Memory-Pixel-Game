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


// -------------- Clean up --------------------------
function removeGrid() {
		"use strict";
       	var removeTR, removeIMG, removeBR, removeP, myMessage;
		removeTR = $('#pixel_canvas').find("tr");
		removeTR.remove();
		removeIMG = $('#pixel_canvas').find("img");
		removeIMG.remove();
		removeBR = $('#pixel_canvas').find("br");
		removeBR.remove();
		myMessage = $("#message");
		myMessage.css("display", "none");
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
var countAA = $(".countA");
var countDIV = $("#divCounter");

function changeToMemory() {
	game1.css("display", "none");
	game2.css("display", "block");
	gameHeader.text("Memory Game");
	countAA.css("display", "block");
	countDIV.css("display", "block");
}

function changeToPixel() {
	game1.css("display", "block");
	game2.css("display", "none");
	gameHeader.text("Pixel Art Maker");
	countAA.css("display", "none");
	countDIV.css("display", "none");
}

// -------------- MemoryGrid function ------------------------

function memoryGrid(num) {
	"use strict";
	// Remove old grid.
	removeGrid();

	// Start game and reset clicks.
	var countClicks = 0;
	$(".countA").css("display", "block");
	$("#countArea").text(countClicks);

	// Fix variables
	var pixelTable = $('#pixel_canvas');
	var split, fullCards, number;

	// Create array with all cards and a small array with "this game cards".
	fullCards = [
	"nBuMXR/3lIndvu", "bX11XR/5e09ciM", "iCUoCR/5HMnHJb", "iFogXR/BipEtkM", "iP3FsR/dSZnfE4", "bT9Ye6/hEMMGYZ",
	"k6uMXR/HiKyKPS", "k7geK6/I4EJ3qN", "cPZoCR/lAEeWg1", "b0SVRm/PzshA8A", "cJORz6/qkrRetU", "e7BDe6/x2d4h8p"
	];


	// Take out right number off cards into new deck/array.
	var gameCards = [];

	for (var ii = 0; ii < (num / 2); ii++) {
		var randId = fullCards[Math.floor(Math.random() * fullCards.length)];
		gameCards.push(randId);
		var checkIndex = fullCards.indexOf(randId);
		fullCards.splice(checkIndex, 1);
	}
	// Copy cards to make pairs.
	var gameCards = gameCards.concat(gameCards);

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
	number = num / split;
	var count = 1;

	// Create grid using for loop.
	for (var k = 1; k <= split; k++) {
		for (var m = 1; m <= number; m++) {
			// Pick random card.
			var rand = gameCards[Math.floor(Math.random() * gameCards.length)];
			// Create that card to website.
			var pic = "<img src=\"https://image.ibb.co/nNUoCR/6ZNcd4e.jpg\" alt=\"card_nr_" + count + "\" value=\"" + rand + "\">";
			pixelTable.append(pic);
			count++;
			// Remove card from deck when on website.
			var index = gameCards.indexOf(rand);
			gameCards.splice(index, 1);
		}
		// New row.
		pixelTable.append("<br>");
	}

	// Turn/change card to its value and make it class-"marked".
	var classesCheck = 0;
	pixelTable.find("img").click(function() {
		var newSource = "https://image.ibb.co/" + $(this).attr("value") + ".jpg";
		$(this).attr("src", newSource);
		// mark target.
		if (classesCheck === 0) {
			if ($(this).attr("class") === "finnished") {
				//do nothing...
			}
			else {
				$(this).addClass("marked1");
				classesCheck = 1;
				// update counter.
				countClicks += 1;
				$("#countArea").text(countClicks);
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
				// update counter.
				countClicks += 1;
				$("#countArea").text(countClicks);
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
			marked1.attr("src", "https://image.ibb.co/nNUoCR/6ZNcd4e.jpg");
			marked2.attr("src", "https://image.ibb.co/nNUoCR/6ZNcd4e.jpg");
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
			var myMessage = $("#message");
			myMessage.text("You did it in " + countClicks +" clicks. Good work!");
			myMessage.css("display", "block");
			$(".countA").css("display", "none");

			checkBest();
		}
	}

	// Update top scoreboard.
	function checkBest() {
		var topNum = 3;
		for (var jj = 1; jj <= topNum; jj++) {
			var bestClick = $("#bestArea" + num + "_click_" + jj);
			var bestName = $("#bestArea" + num + "_name_" + jj);
			var player = $("#playerName").val();
			if (countClicks < bestClick.text()) {
				if (jj + 1 <= topNum) {
					if (jj + 2 <= topNum) {
						$("#bestArea" + num + "_click_" + (jj + 2)).text($("#bestArea" + num + "_click_" + (jj + 1)).text());
						$("#bestArea" + num + "_name_" + (jj + 2)).text($("#bestArea" + num + "_name_" + (jj + 1)).text());
					}
					$("#bestArea" + num + "_click_" + (jj + 1)).text(bestClick.text());
					$("#bestArea" + num + "_name_" + (jj + 1)).text(bestName.text());
				}
				bestClick.text(countClicks);
				bestName.text(player);
				return;
			}
		}
	}
	//..
}

// -------------- On Start up ------------------------------

// Creating default grid and adding eventlisteners.
$(function() {
	"use strict";
	var pixelTable = $('#pixel_canvas');
	//pixelGrid();

	$('#sizePicker').submit(function() {
		event.preventDefault();
		//myGrid.isSet = 1;
		pixelGrid();
		pixelTable.css("background-color", "white");
	});

	// Start memory with 6, 12 or 24 cards.
	$('#memory6_btn').click(function() {
		event.preventDefault();
		memoryGrid(6);
		pixelTable.css("background-color", "grey");
	});
	$('#memory12_btn').click(function() {
		event.preventDefault();
		memoryGrid(12);
		pixelTable.css("background-color", "grey");
	});
	$('#memory24_btn').click(function() {
		event.preventDefault();
		memoryGrid(24);
		pixelTable.css("background-color", "grey");
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


	// Pencil size function (not in use right now).
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