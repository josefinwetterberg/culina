//TODO: Byt ut denna till riktig komponent.


import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div>
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>{meal.strInstructions}</p>
    </div>
  );
}

export default MealDetails;
