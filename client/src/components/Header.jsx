import {
  NavItems,
  MobileNav,
  UserDropdown
} from "./index"

const Header = () => {
  return (
    <header className="header">
      <div>
        <a href="/">
          <img
            src={"/vite.svg"}
            alt="Company Logo"
            width={150}
            height={150}
          />
        </a>
      </div>
      <nav className="hidden md:block">
        <NavItems />
      </nav>
      <div className="flex justify-center flex-row-reverse items-center gap-3">
      <MobileNav />
      <UserDropdown />
      </div>
    </header>
  );
};

export default Header;

