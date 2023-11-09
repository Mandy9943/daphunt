import Image from "next/image";
import Link from "next/link";
import NavbarActions from "./NavActions/NavActions";

export default function Header() {
  return (
    <>
      <nav className="max-w-7xl  md:text-sm flex sm:flex-row flex-col justify-between items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <div className="font-bold text-lg">Daphunt</div>
        </Link>
        <div className="text-gray-700 dark:text-gray-300 sm:max-w-7xl max-w-[200px]">
          <NavbarActions />
        </div>
      </nav>
    </>
  );
}
