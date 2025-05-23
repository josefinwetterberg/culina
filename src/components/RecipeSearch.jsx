import * as React from "react";
import { useEffect, useState } from "react";

function RecipeSearch({ onSubmitRecipe }) {
  const [searchTerm, setSearchTerm] = useState("");
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


  useEffect(() => {
    if (searchTerm.trim().length > 35) {
      setSearchTerm(searchTerm.slice(0, 35));
    } else if (searchTerm.trim().length > 0) {
      onSubmitRecipe(searchTerm, searchType);
    }
  }, [searchTerm, searchType, onSubmitRecipe]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    
  };

 
  const handleSearchTypeChange = (newType) => {
    setSearchType(newType);
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRecipe(searchTerm, searchType);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-search">
      <fieldset className="search-type">
        <legend>Choose search type</legend>
        <label>
          <input
            type="radio"
            name="search-type"
            value="recipe"
            checked={searchType === "recipe"}
            onChange={() => handleSearchTypeChange("recipe")}
          ></input>
          Search by Recipe Name
        </label>

        <label>
          <input
            type="radio"
            name="search-type"
            value="ingredient"
            checked={searchType === "ingredient"}
            onChange={() => handleSearchTypeChange("ingredient")}
          ></input>
          Search by Ingredient
        </label>

        <label>
          <input
            type="radio"
            name="search-type"
            value="category"
            checked={searchType === "category"}
            onChange={() => handleSearchTypeChange("category")}
          ></input>
          Search by Category
        </label>
      </fieldset>


      <div className="search-input">
        {searchType === "category" ? (
          <>
            <label htmlFor="categorySelect">Category:</label>
            <select
              id="categorySelect"
              value={searchTerm}
              onChange={handleSearchTermChange}
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

export default RecipeSearch;
