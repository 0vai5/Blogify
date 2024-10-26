import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "./NavItems";
import {
  Menu
} from "lucide-react"


const MobileNav = () => {
  return (
    <section className="lg:hidden md:block sm:block">
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-10 h-5 flex items-center justify-center">
            <Menu className="font-lg dark:text-white text-dark " />
          </button>
        </SheetTrigger>
        <SheetContent className="bg-white drop-shadow-[-100px 0px 30px -10px rgba(0,0,0,0.1)]">
          <div>
            <a href="/">
              <img
                src={'./vite.svg'}
                alt="Company Logo"
                width={150}
                height={100}
              />
            </a>
          </div>
          <NavItems />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;