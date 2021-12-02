// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ScoreBoard from './components/ScoreBoard';
import BlueCandy from './images/blue-candy.png'
import RedCandy from './images/red-candy.png'
import PurpleCandy from './images/purple-candy.png'
import OrangeCandy from './images/orange-candy.png'
import GreenCandy from './images/green-candy.png'
import YellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

let width = 8;
const candyColors = [
  BlueCandy,
  RedCandy,
  PurpleCandy,
  OrangeCandy,
  GreenCandy,
  YellowCandy,
  // blank
  // 'indigo',
]

function App() {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [ scoreDisplay, setScoreDisplay ] = useState(0)


  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      //define column of four
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      //choose the decided color that user is checking
      const decidedColor = currentColorArrangement[i]
      // console.log(decidedColor)
      const isBlank = currentColorArrangement[i] === blank


      //check if each square in the column is the same as the first square is true. in other words, is it a match?
      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)

        //if true
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        //return true makes it a boolean that returns a true, that can be used in our valid moves function
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      //check for rows of three
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      //choose the decided color that user is checking
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 52, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      //check if each square in the column is the same as the first square is true
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor  && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        //if true
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
    //loop until you get to index 47, because thats the last index where you can get a column of three
    for (let i = 0; i <= 47; i++) {
      //check for columns of three
      //checking for first index (i), eigth index (i + width), last index(i + width * 2) to make the column of 3
      const columnOfThree = [i, i + width, i + width * 2]
      //choose the decided color that user is checking
      const decidedColor = currentColorArrangement[i]
      // console.log(decidedColor)
      const isBlank = currentColorArrangement[i] === blank

      //check if each square in the column is the same as the first square is true
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        //if true
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      //check for rows of three
      const rowOfThree = [i, i + 1, i + 2]
      //choose the decided color that user is checking
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      //check if each square in the column is the same as the first square is true
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        //if true
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  //if square empty, drop new square below
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if ((currentColorArrangement[i + width]) === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }

  console.log("score" + scoreDisplay)

  //which square are you picking
  const dragStart = (e) => {
    // console.log('drag start')
    // console.log(e.target)
    setSquareBeingDragged(e.target)
  }
  //where is the square being dropped
  const dragDrop = (e) => {
    // console.log(e.target)
    // console.log('drag drop')
    setSquareBeingReplaced(e.target)
  }


  //on drag end is where the logic happens to see if this is a valid move or not
  const dragEnd = (e) => {
    // console.log(e.target)
    // console.log('drag end')

    //get id of square being replaced
    //parseInt so we can return a number, so we can save it as a number to do additions and math to it.
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    //we can treat squareBeingReplacedId as a number now
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    //like currentColorArrangement[i]
    //i wonder if i could do something like currentColorArrangement[squareBeingReplacedId + width] or can i use a function instead of the variable
    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    // console.log('squareBeingDraggedId', squareBeingDraggedId)
    // console.log('squareBeingReplacedId', squareBeingReplacedId)

    //define valid moves
    const validMoves = [
      //this is why squareBeingDraggedId should be a number, you would not be able to do this if it were a string
      squareBeingDraggedId - 1, //backwards
      squareBeingDraggedId - width, //directly above
      squareBeingDraggedId + 1, //to the right
      squareBeingDraggedId + width //directly below
    ]
    //check if its a valid move
    const validMove = validMoves.includes(squareBeingReplacedId)
    //this is where we can save that boolean in checkFor functions
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId && 
      validMove && 
      ( isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
        //move evertyhign back
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
        // //why does putting a comma between these two lines break the entire app?
        // currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor,
        // currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor
        setCurrentColorArrangement([...currentColorArrangement]) 
    }
  }






  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  //check for columns of three is put into another useEffect because we want to trigger it when certain variables change. 
  //so were putting dependencies in it
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100) 
    return () => clearInterval(timer)

  }, [checkForRowOfFour, checkForColumnOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])



  // console.log(currentColorArrangement)

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            // style={{ backgroundColor: candyColor }}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        ))}

        {/* <button onClick={checkForColumnOfThree}>decided color</button> */}
      </div>
      <ScoreBoard score={scoreDisplay}></ScoreBoard>
    </div>
  );
}

export default App;
