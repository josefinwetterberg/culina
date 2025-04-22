import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RecipeSearch from "./components/RecipeSearch";
import RecipeList from "./components/RecipeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Culina</h1>
      <RecipeSearch />

      <div className="card">
        <RecipeList />
      </div>
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
  );
}

export default App;
