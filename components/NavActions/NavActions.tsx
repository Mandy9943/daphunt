"use client";

import Login from "@/components/Login/Login";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { Dot, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavbarActions = () => {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const { isLoggedIn } = useAuthentication();
  const onSubmitDappClick = () => {
    if (isLoggedIn) {
      router.push("/new");
    } else {
      toast.error("Connect your wallet to submit a dApp");
    }
  };
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center gap-x-[4px] " variant={"outline"}>
        <Image src="/images/egld.svg" alt="" width={22} height={22} />
        <span className="hidden sm:flex">
          <Dot size={20} className="text-green-500" /> MultiversX
        </span>
      </Button>

      <Button variant={"outline"} onClick={onSubmitDappClick}>
        Submit Dapp
      </Button>

      {/* <div className="hidden sm:block">
        <ModeToggle />
      </div> */}
      <Login />
      {theme === "dark" ? (
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => setTheme("light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem]   " />
        </Button>
      ) : (
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => setTheme("dark")}
        >
          <Moon className=" h-[1.2rem] w-[1.2rem]" />
        </Button>
      )}

      {/* <MobileNav /> */}
    </div>
  );
};

export default NavbarActions;
