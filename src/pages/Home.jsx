import { useState, useCallback, useRef } from "react";
import RecipeSearch from "../components/RecipeSearch";
import RecipeList from "../components/RecipeList";
import debounce from "lodash/debounce";
import "../App.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState("recipe");
 

  
  const debouncedFetch = useRef(
    debounce((term, type) => {
     
      
      if (!term.trim()) return;
      
      setIsLoading(true);
      
      let url;
      if (type === "recipe") {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
      } else if (type === "category") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`;
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`;
      }
      
      fetch(url)
        .then(response => response.json())
        .then(async data => {
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
        })
        .catch(error => {
          setRecipes([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500)
  ).current;

  const handleRecipeSubmit = useCallback((term, type) => {
    setSearchTerm(term);
    setSearchType(type);
    debouncedFetch(term, type);
  }, [debouncedFetch]);

  return (
    <>
      <main>
        <section className="app-name">
          <h1 className="visually-hidden">Culina</h1>
          <img src="./culina-logo.png" alt="Culina Logo" />
        </section>
        
        <RecipeSearch onSubmitRecipe={handleRecipeSubmit} />

        <section className="card">
          <RecipeList
            recipes={recipes}
            searchTerm={searchTerm}
            isLoading={isLoading}
            searchType={searchType}
          />
          </section>
        </main>
    </>
  );
}

export default Home;
