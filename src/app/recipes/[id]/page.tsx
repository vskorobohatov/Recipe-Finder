import React from "react";
import SpoonacularService from "@/services/Spoonacular";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import ContentWrapper from "@/components/ContentWrapper";
import Title from "@/components/Title";
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Params } from "next/dist/server/request/params";

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
  searchParams
}: {
  params: Params;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const { id } = await params;
  const recipe = await getDetails(id ? +id : 0);
  const searchParamsValues: any = await searchParams;
  const backUrl = `/recipes${searchParamsValues ? `?${new URLSearchParams(searchParamsValues).toString()}` : ""}`;

  return (
    <PageWrapper>
      <ContentWrapper>
        <a href={backUrl} className="mb-0 w-fit font-bold">
          {"<"} Back to Recipes
        </a>
        <div className="mb-0 flex items-center gap-4">
          <div className="flex-1 aspect-[16/9] relative">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              objectFit="cover"
            />
          </div>
          <Title className="flex-3 text-left">
            {recipe.title}
          </Title>
        </div>
        {recipe?.message && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {recipe.message}
          </div>
        )}
        <ul className="mb-0 space-y-1 text-gray-900 dark:text-gray-100">
          {recipe.readyInMinutes && (
            <li>
              <span className="font-medium">Servings:</span> {recipe.servings}
            </li>
          )}
          {recipe.readyInMinutes && (
            <li>
              <span className="font-medium">Ready In Minutes:</span>{" "}
              {recipe.readyInMinutes}
            </li>
          )}
          {recipe.cookingMinutes && (
            <li>
              <span className="font-medium">Cooking Minutes:</span>{" "}
              {recipe.cookingMinutes}
            </li>
          )}
          {recipe.preparationMinutes && (
            <li>
              <span className="font-medium">Preparation Minutes:</span>{" "}
              {recipe.preparationMinutes}
            </li>
          )}
        </ul>
        <h2 className="mb-0 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Ingredients
        </h2>
        <ul className="space-y-1">
          {recipe.extendedIngredients &&
            recipe.extendedIngredients.length > 0 ? (
            recipe.extendedIngredients.map(
              (ingredient: IngredientInterface, i: number) => (
                <li
                  key={`${ingredient.id}-${i}`}
                  className="text-gray-900 dark:text-gray-100 mr-2 font-medium flex items-center gap-2"
                >
                  <div className="w-[4px] h-[4px] bg-gray-900 dark:bg-gray-100 rounded-full" /> {ingredient.amount} {ingredient.originalName}
                </li>
              ),
            )
          ) : (
            <li className="text-gray-500 dark:text-gray-400">
              No ingredients found.
            </li>
          )}
        </ul>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default RecipeDetails;
