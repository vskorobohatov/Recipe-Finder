"use client";
import { useSearchParams } from "next/navigation";
import { CUISINES } from "./variables";
import { useState } from "react";
import Title from "@/components/Title";
import PageWrapper from "@/components/PageWrapper";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import CustomButton from "@/components/CustomButton";
import ContentWrapper from "@/components/ContentWrapper";

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
      <ContentWrapper>
        <form
          className="flex flex-col gap-4 w-full items-center"
          action="/recipes"
          method="get"
        >
          <div className="w-full flex gap-4">
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
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Home;
