"use client";
import useAuthentication from "@/hooks/useAuthentication";
import Image from "next/image";
import Link from "next/link";
import NavbarActions from "./NavActions/NavActions";

export default function Header() {
  const { handleDisconnect, isLoggedIn, handleConnect } = useAuthentication();

  return (
    <>
      <nav className="max-w-7xl  md:text-sm flex justify-between items-center gap-2  sm:gap-6">
        <div className="flex gap-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-black.png"
              alt="logo"
              className="block dark:hidden"
              width={150}
              height={80}
            />

            <Image
              src="/logo-white.png"
              alt="logo"
              className="hidden dark:block"
              width={150}
              height={80}
            />
          </Link>
        </div>
        <div className="text-gray-700 dark:text-gray-300 sm:max-w-7xl ">
          <NavbarActions />
        </div>
      </nav>
    </>
  );
}
