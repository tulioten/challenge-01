import { useState } from 'react'

import './App.css'

function App() {
  const [list, setList] = useState([])
  const [sliced, setSliced] = useState([])

  const handleClick = (event) => {

    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    }

    setList( (prev) => [...prev, newDot]);
    setSliced([]);
  }

  const handleUndo = (event) => {
    event.stopPropagation()

    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length -1];
    setSliced((prev) => [...prev, lastItem]);


    setList((prev) => {
      const newArr = [...prev].slice(0,-1);
      return newArr
    })
  }

  const handleRedo = (event) => {
    event.stopPropagation()

    if (sliced.length === 0) {
      return;
    }

    const recoveredDot = sliced[sliced.length -1];

    setSliced((prev) => {
      const newArr = [...prev].slice(0,-1);
      return newArr;
    });

    setList((prev) => [...prev, recoveredDot])


  }

  const handleRestart = (event) => {
    event.stopPropagation()
    setList([]),
    setSliced([]);
  }

  return (
    <div onClick={handleClick} id="App">
      {list.map((item) => (
        <span className='dot' style={{left: item.clientX, top: item.clientY}} />
        ))}

      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      <button onClick={handleRestart}>Resetar</button>


    </div>
  )
}

export default App
