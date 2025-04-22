import * as React from "react";
import { useEffect, useState } from "react";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

function RecipeSearch(onSubmitRecipe) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.meals[0].strMeal);
    };
    fetchData();
  }, []);

  return (
    <form onSubmit={onSubmitRecipe}>
        <div>
            <label htmlFor="recipeInput">Recipe:</label>
            <input
            id="recipeInput"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  const onSubmitRecipe = (recipe) => alert(`You entered: ${recipe}`);
  return <RecipeSearch onSubmitRecipe={onSubmitRecipe} />;
}

export default App;

