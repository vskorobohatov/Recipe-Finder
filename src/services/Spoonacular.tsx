import axios from "axios";
import { EXAMPLE_DETAILS, EXAMPLE_SEARCH } from "./exampleData";

interface RecipeQuery {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}

class SpoonacularService {
  private apiKey: string | undefined;
  private baseUrl: string | undefined;

  constructor() {
    this.apiKey = process.env.SPOONACULAR_API_KEY;
    this.baseUrl = process.env.SPOONACULAR_BASE_URL;
  }

  async searchRecipes(query: RecipeQuery) {
    try {
      const recipes = await axios.get(`${this.baseUrl}/recipes/complexSearch`, {
        params: {
          apiKey: this.apiKey,
          ...query,
        },
      });
      console.log("123", recipes);
      return recipes.data;
      // eslint-disable-next-line
    } catch (e: any) {
      console.error("Error in searchRecipes", e);
      return {
        ...EXAMPLE_SEARCH,
        message: `${e.response.data.message} Default data due to 402 error`,
      };
    }
  }

  async getRecipeDetails(id: number) {
    try {
      const recipes = await axios.get(
        `${this.baseUrl}/recipes/${id}/information`,
        {
          params: {
            apiKey: this.apiKey,
          },
        },
      );
      return recipes.data;
      // eslint-disable-next-line
    } catch (e: any) {
      console.error("Error in searchRecipes", e);
      return {
        ...EXAMPLE_DETAILS,
        message: `${e.response.data.message} Default data due to 402 error`,
      };
    }
  }
}

const service = new SpoonacularService();
export default service;
