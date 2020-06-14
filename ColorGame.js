// Global Variables
var squares;
var squareColors;
var correctColor;

// Main Method
function main()
{
	squares = document.getElementsByClassName("Square");
	squareColors = randomColors();
	correctColor = squareColors[Math.floor(Math.random() * squareColors.length)];

	setHeading(correctColor);
	fillColors(squares, squareColors);
	addListeners(squares);
}

// User Defined Functions

function randomColors()
{
	var mode = document.getElementsByClassName("Selected")[0];
	var size;
	
	if(mode.textContent === "Easy") size = 3
	else size = 6;

	squareColors = [];

	for(var i=0; i<size; i++)
		squareColors[i] = getRandomColor();

	return squareColors;
}

function getRandomColor()
{
	return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
}

function setHeading(correctColor)
{
	var displayColor = document.getElementById("displayColor");
	displayColor.textContent = correctColor;
}

function fillColors(squares, squareColors)
{
	for(var i=0; i<squares.length; i++)
	{
		if(squareColors[i])
		{
			squares[i].style.display = "block";
			squares[i].style.background = squareColors[i];
		}
		else
			squares[i].style.display = "none";
	}

	if(squareColors.length === 3)
		document.getElementById("container").style.height = "250px";
	else
		document.getElementById("container").style.height = "500px";
}

function addListeners(squares)
{
	for(var i=0; i<squares.length ; i++)
	{
		squares[i].addEventListener("click", function() {
			checkColor(this, squares);
		});
	}

	var easyBtn = document.getElementsByClassName("EasyMode")[0];
	var hardBtn = document.getElementsByClassName("HardMode")[0];
	var newGame = document.getElementsByClassName("NewGame")[0];

	easyBtn.addEventListener("click", function(){
		hardBtn.classList.remove("Selected");
		easyBtn.classList.add("Selected");
		setNewGame();
	});

	hardBtn.addEventListener("click", function(){
		hardBtn.classList.add("Selected");
		easyBtn.classList.remove("Selected");
		setNewGame();
	});

	newGame.addEventListener("click", function(){
		setNewGame();
	});
}

function checkColor(clickedSquare, squares)
{
	var clickedColor = clickedSquare.style.background;
	var status = document.getElementsByClassName("Status")[0];
	var heading = document.getElementById("heading");

	if(clickedColor === correctColor)
	{
		for(var i=0; i<squares.length; i++)
		{
			squares[i].style.background = clickedColor;
		}

		status.textContent = "Correct";
		status.classList.remove("TryAgain");
		status.classList.add("Correct");
		heading.style.background = clickedColor;
	}
	else
	{
		status.textContent = "Try Again";
		status.classList.remove("Correct");
		status.classList.add("TryAgain");
		clickedSquare.style.background = "#232323";
	}

}

function setNewGame()
{
	console.log("called-->");
	squares = document.getElementsByClassName("Square");
	squareColors = randomColors();
	var correctColorId = Math.floor(Math.random() * squareColors.length);
	correctColor = squareColors[correctColorId];

	setHeading(correctColor);
	fillColors(squares, squareColors);
	resetStatus();
}

function resetStatus()
{
	var status = document.getElementsByClassName("Status")[0];

	status.classList.remove("Correct");
	status.classList.remove("TryAgain");
	status.textContent = "";
}














