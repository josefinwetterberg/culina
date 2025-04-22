import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RecipeSearch from "./components/RecipeSearch";
import RecipeList from "./components/RecipeList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState("recipe");

  const handleRecipeSubmit = async (term, type) => {
    setSearchTerm(term);
    setSearchType(type);

    if (!term.trim()) return;

    setIsLoading(true);

    try {
      let url;
      if (type === "recipe") {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
      } else if (type === "category") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`;
      }else{
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if ((type === "ingredient" || type === "category") && data.meals) {
        const detailedRecipes = await Promise.all(
          data.meals.map(async (meal) => {
            const detailResponse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const detailData = await detailResponse.json();
            return detailData.meals[0];
          })
        );
        setRecipes(detailedRecipes);
      } else {
        setRecipes(data.meals || []);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Culina</h1>
      <RecipeSearch onSubmitRecipe={handleRecipeSubmit} />

      <div className="card">
        <RecipeList
          recipes={recipes}
          searchTerm={searchTerm}
          isLoading={isLoading}
          searchType={searchType}
        />
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
