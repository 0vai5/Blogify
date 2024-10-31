import {
  Sheet,
  SheetTrigger,
  SheetContent,
  NavItems
} from "@/components/index"
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