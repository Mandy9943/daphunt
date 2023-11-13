"use client";

import Login from "@/components/Login/Login";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { BarChart4, Send, Zap } from "lucide-react";
import { useTheme } from "next-themes";
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
    <div className="ml-auto flex items-center gap-x-3 sm:gap-x-4">
      <Button
        asChild
        variant={"outline"}
        onClick={onSubmitDappClick}
        size={"sm"}
      >
        <a
          href="https://plausible.io/daphunt.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BarChart4 size={"18px"} />
        </a>
      </Button>

      <Button variant={"outline"} onClick={onSubmitDappClick} size={"sm"}>
        <span className="hidden sm:inline">Submit Dapp</span>

        <Send className="inline sm:hidden" size={"18px"} />
      </Button>

      {/* <div className="hidden sm:block">
        <ModeToggle />
      </div> */}
      <Login />

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
