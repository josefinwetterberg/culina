import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./mealdetails.css";

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        return res.json();
      })
      .then((data) => {
        setMeal(data.meals?.[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container" aria-live="polite">
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <p>Error: {error}</p>
        <Link to="/" className="back-button">
          Return to recipe search
        </Link>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="error-container" role="alert">
        <p>Recipe not found</p>
        <Link to="/" className="back-button">
          Return to recipe search
        </Link>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: measure || "",
      });
    }
  }

  const instructionParagraphs = meal.strInstructions
    .split(/\r\n|\r|\n/)
    .filter((paragraph) => paragraph.trim().length > 0);

  return (
    <article className="meal-details">
      <Link to="/" className="back-button" aria-label="Return to recipe search">
        &larr; Back to search
      </Link>

      <header className="meal-header">
        <div className="meal-image-container">
          <img
            src={meal.strMealThumb}
            alt={`Prepared ${meal.strMeal}`}
            className="meal-image"
          />
        </div>

        <div className="meal-info">
          <h1 className="meal-title">{meal.strMeal}</h1>
        </div>
      </header>

      <div className="meal-content">
        <section
          className="ingredients-section"
          aria-labelledby="ingredients-heading"
        >
          <h2 id="ingredients-heading" className="section-heading">
            Ingredients
          </h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-measure">{item.measure}</span>
                <span className="ingredient-name">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="instructions-section"
          aria-labelledby="instructions-heading"
        >
          <h2 id="instructions-heading" className="section-heading">
            Instructions
          </h2>
          <div className="instructions-content">
            
              <p  className="instruction-paragraph">
              {instructionParagraphs.map((paragraph, index) => (
              <p key={index} className="instruction-paragraph">{paragraph}</p>
            ))}
              </p>
           
          </div>

          {meal.strYoutube && (
            <div className="video-link">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-button"
              >
                Watch video tutorial
              </a>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}

export default MealDetails;
