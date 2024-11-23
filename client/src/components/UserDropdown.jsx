import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./index";
import toast from "react-hot-toast";
import { LogOut, LogIn, User } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function UserDropdown() {
  const { isLoggedIn } = useContext(UserContext)

  const LogoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/signOUT");

      const data = await response.json()
      if(!response.ok) {
        toast.error(data.message);
      }

      toast.success(data.message)
      window.location.replace("/signin")

    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <DropdownMenu className="bg-white">
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="/user.svg" className="cursor-pointer dark:hidden" />
          <AvatarImage
            src="/user-dark.svg"
            className="cursor-pointer hidden dark:flex"
          />
          <AvatarFallback className="cursor-pointer">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:text-gray-200 text-black" />
        {isLoggedIn ? (
          <>
            <div className="p-3">
              <a href="/profile">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <User className="h-3.5 w-3.5" />
                  <span className="not-sr-only">Profile</span>
                </Button>
              </a>
            </div>
            <div className="p-3">
              <Button
                size="lg"
                variant="outline"
                className="h-7 gap-1 text-sm"
                onClick={LogoutHandler}
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="not-sr-only">LogOut</span>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="p-3">
              <a href="/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                  onClick={LogoutHandler}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span className="not-sr-only">SignIn</span>
                </Button>
              </a>
            </div>
            <p className="font-bold text-center">Or</p>
            <div className="p-3">
              <a href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                  onClick={LogoutHandler}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span className="not-sr-only">SignUp</span>
                </Button>
              </a>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
