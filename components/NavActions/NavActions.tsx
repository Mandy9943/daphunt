"use client";

import Login from "@/components/Login/Login";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { Dot, Moon, Send, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavbarActions = () => {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const { isLoggedIn, handleConnect, handleDisconnect, isLoginModal } =
    useAuthentication();
  const onSubmitDappClick = () => {
    if (isLoggedIn) {
      router.push("/new");
    } else {
      toast.error("Connect your wallet to submit a dApp");
    }
  };
  return (
    <div className="ml-auto flex items-center gap-x-1">
      <Button
        className="flex items-center gap-x-[4px] w-[40px] sm:w-auto px-2 sm:px-3"
        variant={"outline"}
      >
        <Image src="/images/egld.svg" alt="" width={22} height={22} />
        <span className="hidden sm:flex">
          <Dot size={20} className="text-green-500" /> MultiversX
        </span>
      </Button>

      <Button variant={"outline"} onClick={onSubmitDappClick} size={"sm"}>
        <span className="hidden sm:inline">Submit Dapp</span>

        <Send className="inline sm:hidden" size={"18px"} />
      </Button>

      {/* <div className="hidden sm:block">
        <ModeToggle />
      </div> */}
      <Login />
      {theme === "dark" ? (
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => setTheme("light")}
        >
          <Sun size={"18px"} />
        </Button>
      ) : (
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => setTheme("dark")}
        >
          <Moon size={"18px"} />
        </Button>
      )}
      <Button
        size={"sm"}
        className="flex sm:hidden"
        onClick={() => (isLoggedIn ? handleDisconnect() : handleConnect())}
      >
        <Zap size={"18px"} className="text-gray-200 dark:text-gray-500" />
      </Button>

      {/* <MobileNav /> */}
    </div>
  );
};

export default NavbarActions;
