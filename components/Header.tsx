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
            <Image src="/logo.png" alt="logo" width={30} height={30} />
            <div className="font-bold text-lg">Daphunt</div>
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
