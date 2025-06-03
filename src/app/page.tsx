"use client";
import { useSearchParams } from "next/navigation";
import { CUISINES } from "./variables";
import { useState } from "react";
import Title from "@/components/Title";
import PageWrapper from "@/components/PageWrapper";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import CustomButton from "@/components/CustomButton";

const Home = () => {
  const searchParamsValues = useSearchParams();
  const [values, setValues] = useState({
    query: searchParamsValues.get("query") || "",
    cuisine: searchParamsValues.get("cuisine") || "",
    maxReadyTime: searchParamsValues.get("maxReadyTime") || "",
  });

  const isEmpty = !values.query && !values.cuisine && !values.maxReadyTime;

  return (
    <PageWrapper>
      <Title>Recipe Finder</Title>
      <form
        className="mb-6 flex flex-col gap-4 w-full items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
        action="/recipes"
        method="get"
      >
        <div className="flex flex-row gap-4 w-full justify-center max-[800px]:flex-col">
          <CustomInput
            value={values.query}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                query: e.target.value,
              }));
            }}
            type="text"
            placeholder="Search for recipes..."
            name="query"
          />
          <CustomInput
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
          />
          <CustomSelect
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
          </CustomSelect>
        </div>
        <CustomButton
          disabled={isEmpty}
          type="submit"
          className={
            isEmpty
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        >
          Next
        </CustomButton>
      </form>
    </PageWrapper>
  );
};

export default Home;
