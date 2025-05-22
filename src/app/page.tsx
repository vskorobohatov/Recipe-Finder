"use client";
import { useSearchParams } from "next/navigation";
import { CUISINES } from "./variables";
import { useState } from "react";

const Home = () => {
  const searchParamsValues = useSearchParams();
  const [values, setValues] = useState({
    query: searchParamsValues.get("query") || "",
    cuisine: searchParamsValues.get("cuisine") || "",
    maxReadyTime: searchParamsValues.get("maxReadyTime") || "",
  });

  const isEmpty = !values.query && !values.cuisine && !values.maxReadyTime;

  return (
    <div className="container mx-auto p-4 max-w-[800px] flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Recipe Finder</h1>
      <form
        className="mb-6 flex flex-col gap-4 w-full items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
        action="/recipes"
        method="get"
      >
        <div className="flex flex-row gap-4 w-full justify-center max-[800px]:flex-col">
          <input
            value={values.query}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                query: e.target.value,
              }));
            }}
            type="text"
            placeholder="Search for recipes..."
            className="border border-gray-300 rounded px-3 py-2 h-10 focus:outline-none focus:border-blue-500 flex-4 transition duration-300"
            name="query"
          />
          <input
            type="number"
            name="maxReadyTime"
            min="0"
            value={values.maxReadyTime}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                maxReadyTime: e.target.value,
              }));
            }}
            placeholder="Prep time (max)"
            className="border border-gray-300 rounded px-3 py-2 h-10 focus:outline-none focus:border-blue-500 flex-1 transition duration-300"
          />
          <select
            className="border border-gray-300 rounded px-3 py-2 h-10 focus:outline-none focus:border-blue-500 flex-1 transition duration-300"
            name="cuisine"
            value={values.cuisine}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                cuisine: e.target.value,
              }));
            }}
          >
            <option value="">All Cuisines</option>
            {CUISINES.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={isEmpty}
          type="submit"
          className={`font-semibold px-4 py-2 rounded w-full transition duration-300 ${
            isEmpty
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Home;
