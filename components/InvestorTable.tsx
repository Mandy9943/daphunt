import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import api from "@/services/api";
import { IProject } from "@/types/project.type";
import { ErrorMessage, getFileUrl } from "@/utils/utils";
import { Triangle } from "lucide-react";
import Image from "next/image";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import CheckIcon from "./Icons/CheckIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import WebsiteIcon from "./Icons/WebsiteIcon";
import { Button } from "./ui/button";

export default function InvestorTable({
  projects,
  search,
}: {
  projects: IProject[];
  search: string;
}) {
  const address = useAppSelector(selectUserAddress);
  const handleVote = async (projectId: number) => {
    if(!address) return toast.error("Please connect your wallet first" , {autoClose: 3000})
    toast.promise(api.post("/vote", { address, id: projectId }), {
      pending: "Sending your vote...",
      success: "Your vote has been successfully sent!",
      error: {
        render({ data }) {
          console.log({ data });

          // When the promise reject, data will contains the error
          return ErrorMessage(data, "Your vote has not been sent!");
        },
      },
    });
  };

  return (
    <div>
      <table className="min-w-full md:divide-y bg-gray-100 dark:bg-zinc-900 md:bg-transparent divide-gray-300 rounded-lg overflow-hidden md:rounded-none">
        <thead className="bg-gray-50 dark:bg-gray-950 hidden md:table-header-group">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Slogan
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Tools
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              APY
            </th>
            {/* <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Details
            </th> */}
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
            ></th>
          </tr>
        </thead>
        <tbody className="md:divide-y divide-gray-200 md:bg-white dark:md:bg-black grid grid-cols-1 gap-3 sm:grid-cols-2 md:table-row-group">
          {projects.map((person) => (
            <tr
              key={person.id}
              className="grid grid-cols-3  gap-[15px] md:table-row  rounded-lg md:rounded-none md:bg-transparent shadow md:shadow-none border border-gray-200 md:border-x-0 py-3 px-2 md:p-0"
            >
              <td className="col-span-3 whitespace-nowrap pl-3 md:py-2 md:pl-6 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <Image
                      className="rounded-full"
                      width={40}
                      height={40}
                      src={getFileUrl(person.logo)}
                      alt="twitter avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      <Highlighter
                        searchWords={search.split(" ")}
                        autoEscape={true}
                        textToHighlight={person.name}
                      />
                      {/* {person.verified && (
                        <CheckIcon className="inline ml-1" />
                      )} */}
                    </div>
                    <div className="flex space-x-2 items-center mt-1">
                      {person.twitterUrl && (
                        <a
                          className="text-blue-500"
                          href={person.twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">Twitter</span>
                          <TwitterIcon />
                        </a>
                      )}
                      {person.site && (
                        <a
                          className="text-blue-500"
                          href={person.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">Website</span>
                          <WebsiteIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="col-span-3   px-3 md:px-2 md:py-3 text-sm text-gray-500 font-bold md:font-normal max-w-[300px]">

               <p className="max-w-[300px] break-all overflow-hidden">
                {person.slogan}
               </p>
                {/* <Highlighter
                  searchWords={search.split(" ")}
                  autoEscape={true}
                  textToHighlight={person.slogan ?? "Unknown"}
                  className="max-w-[200px] break-all"
                /> */}
              </td>
              <td className="col-span-3 whitespace-nowrap px-3 md:px-2 md:py-3 text-sm text-gray-500 -mt-2 md:mt-0 max-w-[150px]">
              <div className="w-full flex flex-wrap">

                {person.tools.slice(0,3).map((tool) => (
                  <Highlighter
                  key={tool}
                    searchWords={search.split(" ")}
                    autoEscape={true}
                    textToHighlight={tool}
                    className="bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 px-2 py-1 mr-2 mb-2 rounded-full text-xs"

                  />

                ))}

                {person.tools.length > 3 && (
                  <div className="bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 px-2 py-1 mr-2 mb-2 rounded-full text-xs">
                    + {person.tools.length - 3} more
                  </div>
                )}
              </div>
              </td>
              <td className="col-span-3 whitespace-nowrap px-0 px-2 md:py-3 text-sm text-gray-500  md:justify-self-end justify-normal">
                <Highlighter
                  searchWords={search.split(" ")}
                  autoEscape={true}
                  textToHighlight={person.apr + " %"}
                />
              </td>
              {/* <td className="col-span-3 md:max-w-xs px-3 md:px-2 md:py-3 text-sm text-gray-500">
                <Highlighter
                  searchWords={search.split(" ")}
                  autoEscape={true}
                  textToHighlight={person.details}
                />
              </td> */}
              <td className="col-span-3 md:max-w-xs px-3 md:px-2 md:py-3 text-sm text-gray-500">
                <div className="flex justify-center sm:block">
                  <Button
                    className="py-2 h-14 bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                    variant={"outline"}
                    onClick={() => handleVote(person.id)}
                  >
                    <span className="flex flex-col">
                      <Triangle />
                      {person._count.votedUp || 0}
                    </span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {projects.length === 0 && (
        <div className="text-center my-10">No results found</div>
      )}
    </div>
  );
}
