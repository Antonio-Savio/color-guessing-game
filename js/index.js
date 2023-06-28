var circles = document.querySelectorAll(".circle")
var RGBDisplay = document.querySelector("#color-selected")
var message = document.querySelector("#retry-correct")
var newGame = document.querySelector("#new-game")
var difficulty = document.querySelectorAll(".mode")

var selectedColor
var numCircles = 3
var colorsRGB = []

start()

function start() {
    RGBDisplay.textContent = selectedColor
    configureCircles()
    configureMode()
    reset()
}

newGame.addEventListener('click', () => {
    reset()
})

function reset() {
    colorsRGB = createColors(numCircles)
    selectedColor = pickColor()
    message.innerHTML = ''
    newGame.innerHTML = "New Game"
    RGBDisplay.innerHTML = selectedColor

    for (var i = 0; i < circles.length; i++) {
        if (colorsRGB[i]) {
            circles[i].style.display = 'block'
            circles[i].style.backgroundColor = colorsRGB[i]
        } else {
            circles[i].style.display = 'none' 
        }
    }
}

function createColors(nCircles) {
    var array = []
    for (var i = 0; i < nCircles; i++) {
        array.push(randomColor())
    }

    return array
}

function randomColor() {
    var R = Math.floor(Math.random() * 256)
    var G = Math.floor(Math.random() * 256)
    var B = Math.floor(Math.random() * 256)

    return 'rgb(' + R + ', ' + G + ', ' + B + ')'
}

function pickColor() {
    var random = Math.floor(Math.random() * colorsRGB.length)

    return colorsRGB[random]
}

function configureCircles() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = colorsRGB[i]
        circles[i].addEventListener('click', function() {
            var clicked = this.style.backgroundColor

            if (clicked == selectedColor) {
                message.innerHTML = 'Correct'
                newGame.innerHTML = "Play Again"

                for (let rgb of circles) {
                    rgb.style.backgroundColor = clicked
                }
            } else {
                this.style.backgroundColor = "#333"
                message.innerHTML = 'Try again'
            }
        })
    }
}

function configureMode() {
    for (let level of difficulty) {
        level.addEventListener('click', function() {
            if (this.innerHTML == 'Easy') {
                numCircles = 3
            } else {
                numCircles = 9
            }

            if (this.classList.value.includes('selected') == false) {
                reset()
            }

            for (let mode of difficulty) {
                mode.classList.remove('selected')
            }
            
            this.classList.add('selected')            
        })
    }
}