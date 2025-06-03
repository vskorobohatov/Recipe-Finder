import PageWrapper from "@/components/PageWrapper";
import Title from "@/components/Title";
import SpoonacularService from "@/services/Spoonacular";
import Image from "next/image";

interface RecipeType {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

interface RecipesResponse {
  results: RecipeType[];
  totalResults: number;
  offset: number;
  number: number;
}

const cache = new Map<string, { data: RecipesResponse; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

const searchRecipes = async ({
  query,
  cuisine,
  maxReadyTime,
}: {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}) => {
  if (!query && !cuisine && !maxReadyTime) return {};

  const params: Record<string, string> = {};
  if (query) params.query = query;
  if (cuisine) params.cuisine = cuisine;
  if (maxReadyTime) params.maxReadyTime = maxReadyTime;

  const cacheKey = JSON.stringify(params);
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await SpoonacularService.searchRecipes(params);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
};

const Recipes = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsValues = await searchParams;
  const recipes = await searchRecipes(searchParamsValues);

  return (
    <PageWrapper>
      <Title>Recipes</Title>
      {recipes?.results && recipes.results.length > 0 ? (
        <ul className="space-y-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {recipes?.message && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {recipes.message}
            </div>
          )}
          {recipes.results.map((recipe: RecipeType) => (
            <li
              key={recipe.id}
              className="p-4 border rounded shadow-sm flex items-center space-x-4 hover:border-blue-500 transition duration-300"
            >
              <a
                href={`/recipes/${recipe.id}`}
                className="flex items-center space-x-4 w-full"
              >
                {recipe.image && (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={64}
                    height={64}
                  />
                )}
                <span className="font-medium text-[16px] sm:text-[20px]">
                  {recipe.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No recipes found.</p>
      )}
    </PageWrapper>
  );
};

export default Recipes;
