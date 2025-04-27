//TODO: Byt ut denna till riktig komponent.

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./mealdetails.css"

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals?.[0]));
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  return (
    <>
      <div className="image-wrapper">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>
      <div>
        <h1>{meal.strMeal}</h1>
        <h3>Category: {meal.strCategory || "Not specified"}</h3>
        <h3>Origin: {meal.strArea || "Not specified"}</h3>
      </div>
      <div>
        <h2>Ingredients:</h2>
        <ul>
          {Object.keys(meal)
            .filter((key) => key.startsWith("strIngredient") && meal[key])
            .map((key) => {
              const ingredientNumber = key.slice("strIngredient".length);
              return (
                <li key={key}>
                  {meal[`strMeasure${ingredientNumber}`] || ""} {meal[key]}
                </li>
              );
            })}
        </ul>
      </div>
      <h2>Instructions</h2>
      <div>
        <p>{meal.strInstructions}</p>
      </div>
    </>
  );
}

export default MealDetails;
