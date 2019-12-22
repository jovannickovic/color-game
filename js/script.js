var numSquares = 6;
var colors = [];
var goalColor;

var resetButton = document.getElementById('reset');
var modeButtons = document.querySelectorAll('.mode');
var squares = document.querySelectorAll('.square');

init();
resetButton.addEventListener('click', reset);



// FUNCTIONS
function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');

            this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6;

            reset();
        });
    }
}

function setUpSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];

        squares[i].addEventListener('click', function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === goalColor) {
                document.querySelector('#stripe span').textContent = 'CORRECT!';
                resetButton.textContent = 'Play Again?';

                changeColors(clickedColor);
                document.querySelector('h1').style.backgroundColor = clickedColor;
            } else {
                document.querySelector('#stripe span').textContent = 'Try Again';

                this.style.backgroundColor = '#232323';
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    goalColor = setGoalColor();

    document.querySelector('h1 span').textContent = goalColor;
    this.textContent = 'New Colors';
    document.querySelector('#stripe span').textContent = '';

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = 'initial';
        } else {
            squares[i].style.display = 'none';
        }
    }
    
    document.querySelector('h1').style.backgroundColor = '#494CA2';
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function randomizeColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

function generateRandomColors(num) {
    var colors = [];
    for (var i = 0; i < num; i++) {
        colors.push(randomizeColor());
    }

    return colors;
}

function setGoalColor() {
    var randomColor = Math.floor(Math.random() * colors.length);

    return colors[randomColor];
}