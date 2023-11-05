import { formatNumber } from "@/utils/functions/formatBalance";

interface IProps {
  angelsLength: number;
  averageCheck: number;
  companiesLength: number;
  votes: number;
}

export default function Stats({
  angelsLength,
  averageCheck,
  companiesLength,
  votes,
}: IProps) {
  console.log();

  return (
    <div className="relative mt-10">
      <div className="absolute inset-0 h-1/2" />
      <div className="relative mx-auto max-w-7xl">
        <dl className="rounded-lg bg-white dark:bg-zinc-800 shadow-lg sm:grid sm:grid-cols-4">
          <div className="flex flex-col border-b border-gray-100 dark:border-gray-900 p-6 text-center sm:border-0 sm:border-r">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-muted-foreground">
              Dapps
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight ">
              {formatNumber(angelsLength)}
            </dd>
          </div>
          <div className="flex flex-col border-t border-b border-gray-100 dark:border-gray-900 p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-muted-foreground">
              Average APY
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight ">
              {averageCheck
                ? (averageCheck / 100).toLocaleString(undefined, {
                    style: "percent",
                  })
                : "0%"}
            </dd>
          </div>
          <div className="flex flex-col border-t border-b border-gray-100 dark:border-gray-900 p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-muted-foreground">
              Votes
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight ">
              {formatNumber(votes)}
            </dd>
          </div>
          <div className="flex flex-col border-t border-gray-100 dark:border-gray-900 p-6 text-center sm:border-0 sm:border-l">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-muted-foreground">
              Blockchains
            </dt>
            <dd className="order-1 text-5xl font-bold tracking-tight ">
              {companiesLength}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
