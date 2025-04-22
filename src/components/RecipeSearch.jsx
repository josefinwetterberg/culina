import { useEffect, useState } from "react";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

function RecipeSearch() {
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
    <div className="recipe-container">
      <h1>{data || "Loading..."}</h1>
    </div>
  );
}

export default RecipeSearch;
