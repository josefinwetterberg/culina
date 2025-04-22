import * as React from "react";
import { useEffect, useState } from "react";

function RecipeSearch({ onSubmitRecipe }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [searchType, setSearchType] = useState("recipe");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRecipe(searchTerm, searchType);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-search">
      <div className="search-type">
        <label>
          <input
            type="radio"
            name="search-type"
            value="recipe"
            checked={searchType === "recipe"}
            onChange={() => setSearchType("recipe")}
          ></input>
          Search by Recipe Name
        </label>

        <label>
          <input
            type="radio"
            name="search-type"
            value="recipe"
            checked={searchType === "ingredient"}
            onChange={() => setSearchType("ingredient")}
          ></input>
          Search by Ingredient
        </label>

        <label>
          <input
            type="radio"
            name="search-type"
            value="recipe"
            checked={searchType === "category"}
            onChange={() => setSearchType("category")}
          ></input>
          Search by Category
        </label>
      </div>

      <div className="search-input">
        {searchType === "category" ? (
          <>
            <label htmlFor="categorySelect">Category:</label>
            <select
              id="categorySelect"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="category-select"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.idCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <label htmlFor="searchInput">
              {searchType === "recipe" ? "Recipe Name:" : "Ingredient:"}
            </label>
            <input
              id="searchInput"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                searchType === "recipe"
                  ? "Enter a recipe name (e.g., Pasta)"
                  : "Enter an ingredient (e.g., Chicken)"
              }
            />
          </>
        )}
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

// function App() {
//   const onSubmitRecipe = (recipe) => alert(`You entered: ${recipe}`);
//   return ;
// }

export default RecipeSearch;
