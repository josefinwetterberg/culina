function RecipeList({ recipes, searchTerm, searchType, isLoading }) {
  if (isLoading) {
    return <div className="recipe-list">Loading recipes...</div>;
  }

  if (!searchTerm || searchTerm.trim().length < 2) {
    return <div className="recipe-list">Search for recipes to see results</div>;
  }

  if (recipes.length === 0) {
    return (
      <div className="recipe-list">
        No recipes found for{" "}
        {searchType === "recipe"
          ? "recipe"
          : searchType === "ingredient"
          ? "ingredient"
          : "category"}
        : "{searchTerm}"
      </div>
    );
  }

  let resultsTitle;
  if (searchType === "recipe") {
    resultsTitle = `Results for recipe: "${searchTerm}"`;
  } else if (searchType === "ingredient") {
    resultsTitle = `Recipes containing: "${searchTerm}"`;
  } else if (searchType === "category") {
    resultsTitle = `Recipes in category: "${searchTerm}"`;
  }

  return (
    <div className="recipe-list">
      <h2>{resultsTitle}</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
            <p>Category: {recipe.strCategory || "Not specified"}</p>
            <p>Origin: {recipe.strArea || "Not specified"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
