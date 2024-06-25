import { useState } from 'react'

import './App.css'

function App() {
  let [counter, setCount] = useState(0)

  function increment(){

    let counters=counter+1;
    
    setCount(counters)

    console.log(counter)

  }

  return (
    <>
      <h1>hello world</h1>
      <h2> Counter value : {counter}</h2>

      <button onClick={increment}>increment</button>
    </>
  )
}

export default App
