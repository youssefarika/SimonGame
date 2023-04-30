import { useState } from 'react'
import './App.css'
import './index.css'
import Simon from './Simon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Simon/>
    </div>
  )
}

export default App
