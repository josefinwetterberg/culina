

function RecipeList({ recipes, searchTerm, isLoading }) {
  if (isLoading) {
    return <div className="recipe-list">Loading recipes...</div>;
  }

  if (!searchTerm) {
    return <div className="recipe-list">Search for recipes to see results</div>;
  }

  if (recipes.length === 0) {
    return <div className="recipe-list">No recipes found for "{searchTerm}"</div>;
  }

  return (
    <div className="recipe-list">
      <h2>Results for "{searchTerm}"</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
            <p>Category: {recipe.strCategory}</p>
            <p>Origin: {recipe.strArea}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;