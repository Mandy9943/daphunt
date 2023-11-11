"use client";
import useAuthentication from "@/hooks/useAuthentication";
import { Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavbarActions from "./NavActions/NavActions";
import { Button } from "./ui/button";

export default function Header() {
  const { handleDisconnect, isLoggedIn, handleConnect } = useAuthentication();

  return (
    <>
      <nav className="max-w-7xl  md:text-sm flex sm:flex-row flex-col justify-between items-center gap-6">
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

          <Button
            size={"sm"}
            className="flex sm:hidden"
            onClick={() => (isLoggedIn ? handleDisconnect() : handleConnect())}
          >
            <Zap size={"18px"} className="text-gray-200 dark:text-gray-500" />
          </Button>
        </div>
        <div className="text-gray-700 dark:text-gray-300 sm:max-w-7xl ">
          <NavbarActions />
        </div>
      </nav>
    </>
  );
}
