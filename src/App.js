import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [isPlayerX, setisPlayerX] = useState(Math.floor(Math.random() * 6) === 0 || Math.floor(Math.random() * 6) === 2 || Math.floor(Math.random() * 6) === 4 ? true : false)
  const [winner, setWinner] = useState('')
  const boxes = document.querySelectorAll('.box')
  const [start, setstart] = useState(false)
  const [draw, setDraw] = useState(false)
  const [playerOne, setplayerOne] = useState('')
  const [playerTwo, setplayerTwo] = useState('')

  console.log("winner", winner)

  const fillBox = (e) => {
    if (e.target.innerText !== '') {
      return
    }
    e.target.innerText = isPlayerX ? 'X' : 'O'
    e.target.classList.add(isPlayerX ? 'x-box' : 'o-box')
    setisPlayerX(!isPlayerX)

  }


  const CheckWinner = () => {

    const valid = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    valid.forEach(arr => {
      const [a, b, c] = arr
      if (boxes[a]?.innerText && boxes[a]?.innerText === boxes[b]?.innerText && boxes[b]?.innerText === boxes[c]?.innerText) {
        setWinner(boxes[a]?.innerText)
        return true
      }
    })

  }

  const checkDraw = () => {
    const boxes = document.querySelectorAll('.box')

    let newArray = [...boxes]
    if (!winner) {

      let isEmpty = false

      newArray?.forEach(box => {

        if (box.innerText === '') {
          isEmpty = true
        }
      })

      if (!winner) {

        setDraw(!isEmpty)
      }
    }
  }


  useEffect(() => {
    CheckWinner()
    if (start && !winner) {
      setTimeout(() => {
        checkDraw()

      }, [500])
    }
  }, [boxes])


  // console.log("draw", draw)


  // useEffect(() => {
  //   if (boxes.length) {
  //     [...boxes]?.map(el => {

  //     })
  //   }
  // })


  return (
    <div className="App">
      {!start && <div className='Start'>
        <h1>Start the Game!</h1>
        <p className='label'>Player One <span className='symbols-X'>X</span></p>
        <input onChange={e => setplayerOne(e.target.value)} placeholder='Enter Name of Player 1 (X)' />
        <p className='label'>Player Two <span className='symbols-O'>O</span></p>
        <input onChange={e => setplayerTwo(e.target.value)} placeholder='Enter Name of Player 2 (O)' />
        <button onClick={() => {
          if (playerOne && playerTwo) {
            setstart(true)
          } else {
            alert('Enter Players Name!')
          }

        }}>Start</button>
      </div>}

      {!winner && start && !draw && <>
        <h1 style={{ color: 'white' }}>It's <span className={isPlayerX ? 'TurnText X-turn' : 'TurnText O-turn'}>{isPlayerX ? playerOne : playerTwo}</span> Turn</h1>
        <div className='Container'>
          <div className='row'>
            <div onClick={fillBox} className='box'></div>
            <div onClick={fillBox} className='box'></div>
            <div onClick={fillBox} className='box'></div>
          </div>
          <div className='row'>
            <div onClick={fillBox} className='box'></div>
            <div onClick={fillBox} className='box'></div>
            <div onClick={fillBox} className='box'></div>
          </div>
          <div className='row'>
            <div onClick={fillBox} className='box'></div>
            <div onClick={fillBox} className='box'></div>
            <div onClick={fillBox} className='box '></div>
          </div>

        </div></>}
      {winner && start && <>
        < h1 className='WinsText'>{winner === 'X' ? playerOne : playerTwo} wins!</h1>
        <button onClick={() => {
          setstart(false)
          setplayerOne('')
          setplayerTwo('')
          setDraw(false)
          setWinner('')
        }}>Restart</button>
      </>}
      {draw && start && !winner && <> < h1 className='WinsText'>It's a Tie</h1>
        <button onClick={() => {
          setstart(false)
          setDraw(false)
          setplayerOne('')
          setplayerTwo('')
          setWinner('')
        }}>Restart</button>
      </>}
    </div >
  );
}

export default App;
