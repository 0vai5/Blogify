import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from "./index"
import toast from "react-hot-toast";
import { LogOut, LogIn, User } from "lucide-react";
import { useState } from "react";


export default function UserDropdown() {
  const [user, setUser] = useState(false)

  // const router = useRouter();

  const LogoutHandler = async () => {
    try {
      const response = await fetch("/api/users/logout");
      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        // router.push("/login");
      } else {
        console.error("Logout failed: ", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="/user.svg" className="cursor-pointer dark:hidden" />
          <AvatarImage src="/user-dark.svg" className="cursor-pointer hidden dark:flex" />
          <AvatarFallback className="cursor-pointer">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:text-gray-200 text-black" />
        {user ? (
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