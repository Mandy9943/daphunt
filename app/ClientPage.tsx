"use client";

import NewsletterForm from "@/components/NewsletterForm/NewsletterForm";
import { IProject } from "@/types/project.type";
import Fuse from "fuse.js";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import InvestorTable from "../components/InvestorTable";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import { compare, searchOptions } from "../utils/utils";

interface IProps {
  data: IProject[];
}

export default function Dashboard({ data }: IProps) {
  console.log("data", data);

  const allAngels = data;
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const category = searchParams!.get("category");

  // Define filtered & sorted projects array
  const ALL_ANGELS = allAngels
    .filter((angel: any) => !angel.hidden)
    .sort(compare)
    .filter((person: any) => {
      return !category ? true : person.checksize_id.toString() === category;
    });
  console.log("ALL_ANGELS", ALL_ANGELS);

  // Fuzzy search with highlighting
  const fuse = new Fuse(ALL_ANGELS, searchOptions);
  const projects = useMemo(() => {
    if (search.length > 0) {
      return fuse.search(search).map((match) => match.item);
    }
    return ALL_ANGELS;
  }, [search, ALL_ANGELS]);

  console.log("projects", projects);

  // Get stats
  const companies = [...new Set(projects.map((angel: any) => angel.company))];
  console.log("companies", companies);

  // const allChecksizes = projects
  //   .filter((angel: any) => angel.checksize_id)
  //   .map((angel: any) => getCheckSizeForId(angel.checksize_id));
  // const averageCheck =
  //   allChecksizes.reduce((a: number, b: number) => a + b, 0) /
  //   allChecksizes.length;

  const allAPY = projects.map((project) => project.apr);
  const averageCheck =
    allAPY.reduce((a: number, b: number) => a + b, 0) / allAPY.length;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 md:px-8 sm:pt-16 pt-8 ">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-gray-800 dark:text-gray-200 font-extrabold mx-auto sm:text-6xl max-w-3xl">
            Find the next{" "}
            <span className="gradienteTitle"> money making dapp </span>to invest
            your cryptos
          </h1>
        </div>
      </div>
      <Stats
        angelsLength={projects.length}
        averageCheck={averageCheck}
        companiesLength={companies.length}
        votes={projects.reduce((a: number, b) => a + b._count.votedUp, 0)}
      />
      <div className="sm:flex flex-col md:flex-row justify-end mt-4">
        {/* <span className="isolate mt-5 inline-flex rounded-md shadow-sm w-fit">
          {checkSizes.map((checkSize) => (
            <Link
              href={checkSize.id !== "7" ? `/?category=${checkSize.id}` : "/"}
              key={checkSize.id}
              className={classNames(
                category === checkSize.id || (!category && checkSize.id === "7")
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "hover:bg-gray-50 hover:dark:bg-gray-900",
                "relative inline-flex items-center first-of-type:rounded-l-md last-of-type:rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700  dark:text-gray-300 focus:z-10 focus:outline-none focus:ring-gray-500 -ml-px first-of-type:-ml-0"
              )}
            >
              {checkSize.label}
            </Link>
          ))}
        </span> */}
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
            <div className="overflow-hidden md:shadow md:ring-1 md:ring-black md:ring-opacity-5 rounded-lg">
              <InvestorTable projects={projects} search={search} />
            </div>
            {/* <div className="text-center mt-10"> */}
            <NewsletterForm />
            <Footer />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
