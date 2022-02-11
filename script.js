const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
/* - The querySelectorAll() method returns a collection of an element's child elements
 that match a specified CSS selector(s), as a static NodeList object.
- getElementById Get the element with the specified id
 */
let circleTurn 

 /* 
 function for allowing to click the box only once the tic tac toe box
 forEach() method calls a function for each element in an array.
 addEventListener() method attaches an event handler to the document.
 */

 startGame() /*To make sure when start the game can hover the x on the box*/

 restartButton.addEventListener('click', startGame)
 function startGame() {
     circleTurn = false
     cellElements.forEach(cell => {
         cell.classList.remove(X_CLASS)
         cell.classList.remove(CIRCLE_CLASS)
         cell.removeEventListener('click', handleClick)
         cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
 }

 function handleClick(e) {
     const cell = e.target
     //if circle turns, circle class otherwise x class
     const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
     //place mark
     placeMark(cell, currentClass)
     //check for win
     if (checkWin(currentClass)) {
         endGame(false)
     } else if (isDraw()) {
         //check for draw
         endGame(true)
     }  else {
         //switch turns
         swapTurns()
         //for x and o hover
         setBoardHoverClass()
     } 
 }

 function placeMark(cell, currentClass) {
     cell.classList.add(currentClass)
 }

function isDraw() {
    /*
    ... = Destructuring assignment is a special syntax that allows us to “unpack” arrays or 
    objects into a bunch of variables, as sometimes that’s more convenient. 
    */
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

 function endGame(draw) {
     if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
     } else { //if wins
         winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
     }
     winningMessageElement.classList.add('show')
 }

 function swapTurns() {
     circleTurn =  !circleTurn
 }

function setBoardHoverClass (){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS) 
    }
}

function checkWin(currentClass) {
    //some() method checks if any array elements pass a test (provided as a function)
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
    /*
    every() method tests whether all elements 
    in the array pass the test implemented by the provided function. It returns a Boolean value.
    */
}