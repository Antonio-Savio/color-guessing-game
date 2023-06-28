var numCircles = 3
var colorsRGB = []
var selectedColor

var circles = document.querySelectorAll(".circle")
var RGBDisplay = document.querySelector("#color-selected")
var message = document.querySelector("#retry-correct")
var newGame = document.querySelector("#new-game")
var difficulty = document.querySelectorAll(".mode")

start()

function start() {
    RGBDisplay.textContent = selectedColor
    setupCircles()
    setupMode()
    reset()
}

newGame.addEventListener("click", function() {
	reset()
})
    
function reset() {
	colorsRGB = genRandomColorsRGB(numCircles)
	selectedColor = chooseColor()
	RGBDisplay.textContent = selectedColor
	newGame.textContent = "New Game"
	message.textContent = ""
	for (var i = 0; i < circles.length; i++) {
		if(colorsRGB[i]) { //if colorsRGB exist in the array 
			circles[i].style.display = "block"
			circles[i].style.backgroundColor = colorsRGB[i]
		}
		else {
			circles[i].style.display = "none"
		}
	}

}

function genRandomColorsRGB(nCircles) {
	var array = []
	for (var i = 0; i < nCircles; i++) {
		array.push(makeColor())
	}
	return array
}

function makeColor() {
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)

    return "rgb(" + r + ", " + g + ", " + b + ")"
}

function chooseColor() {
	var random = Math.floor(Math.random() * colorsRGB.length) //select one out of the 9 circles
	return colorsRGB[random]
}

function setupCircles() {
	for (var i = 0; i < circles.length; i++) {
		circles[i].style.backgroundColor = colorsRGB[i]
		circles[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor
			if(clickedColor == selectedColor) {
				message.textContent = "Correct"
				newGame.textContent = "Play Again"
				changeColorsRGB(selectedColor)
			}
			else {
                this.style.backgroundColor = "#333"
				message.textContent = "Try Again"
			}
		})
	}
}

function changeColorsRGB(color) {
	//EXPERIMENTAR FOREACH

	for(let rgb of circles) {
		rgb.style.backgroundColor = color
	}
	// for(var i = 0; i < circles.length; i++) {
	// 	circles[i].style.backgroundColor = color
	// }
}

function setupMode() {
	for(let level of difficulty) {
		level.addEventListener("click", function() {
			if (this.textContent == "Easy") {
				numCircles = 3
			}
			else {
				numCircles = 9
			}

            if (this.classList.value.includes("selected") == false) {
                reset()
            }

			for (let mode of difficulty) {
				mode.classList.remove("selected")
			}
			this.classList.add("selected")
			
		})
	}
}