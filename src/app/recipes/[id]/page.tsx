import React from "react";
import SpoonacularService from "@/services/Spoonacular";
import Image from "next/image";

interface IngredientMeasure {
  amount: number;
  unitLong: string;
  unitShort: string;
}

interface IngredientMeasures {
  metric: IngredientMeasure;
  us: IngredientMeasure;
}

interface IngredientInterface {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: IngredientMeasures;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

const getDetails = async (id: number) => {
  if (!id) return {};
  return await SpoonacularService.getRecipeDetails(id);
};

const RecipeDetails = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const recipe = await getDetails(id ? +id : 0);

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-8 space-y-4 w-[800px] max-w-[calc(100%-32px)]">
      <div className="flex items-center gap-4">
        <div className="flex items-center w-[64px] h-[64px] rounded overflow-hidden">
          <Image src={recipe.image} alt={recipe.title} width={64} height={64} />
        </div>
        <h1 className="text-[20px] sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {recipe.title}
        </h1>
      </div>
      {recipe?.message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {recipe.message}
        </div>
      )}
      <ul className="space-y-1 text-gray-900 dark:text-gray-100">
        <li>
          <span className="font-medium">Servings:</span> {recipe.servings}
        </li>
        <li>
          <span className="font-medium">Ready In Minutes:</span>{" "}
          {recipe.readyInMinutes}
        </li>
        <li>
          <span className="font-medium">Cooking Minutes:</span>{" "}
          {recipe.cookingMinutes}
        </li>
        <li>
          <span className="font-medium">Preparation Minutes:</span>{" "}
          {recipe.preparationMinutes}
        </li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Ingredients
      </h2>
      <ul className=" space-y-1">
        {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
          recipe.extendedIngredients.map(
            (ingredient: IngredientInterface, i: number) => (
              <li
                key={ingredient.id}
                className="text-gray-900 dark:text-gray-100 mr-2 font-medium"
              >
                {`${i + 1}) `} {ingredient.amount} {ingredient.originalName}
              </li>
            ),
          )
        ) : (
          <li className="text-gray-500 dark:text-gray-400">
            No ingredients found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecipeDetails;
