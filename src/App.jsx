import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RecipeSearch from './components/RecipeSearch';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Culina</h1>
      <RecipeSearch />
    {/*
    <form action="">
      <search>
        <input type="text" />
        <button type='submit'>Search</button>
      </search>
     </form>
     <div className='recipe-container'>

     </div> */}
    </>
  )
}

export default App
