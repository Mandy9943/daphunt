import CheckIcon from "./Icons/CheckIcon";

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-10 sm:gap-0 gap-4 flex sm:flex-row flex-col justify-between items-center px-3 space-y-2 sm:mb-0 mb-3">
      <div>
        <CheckIcon className="inline mr-1" />
        means the dapp has confirmed their information is accurate and up to
        date.
      </div>
    </footer>
  );
}
