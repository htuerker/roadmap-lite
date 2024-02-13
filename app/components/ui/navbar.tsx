import { ClientOnly } from "remix-utils";
import ThemeSwitcher from "./theme-switcher";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-2 md:mb-3 md:rounded-lg">
      <a href="https://www.rowy.io/?utm_source=roadmap">
        <div className="flex flex-col justify-start select-none rounded-lg px-4 py-1">
          <span className="text-2xl font-bold">Roadmap</span>
          <span className="text-xs">Powered by Rowy</span>
        </div>
      </a>
      <div className="ml-auto">
        <ClientOnly fallback={<></>}>{() => <ThemeSwitcher />}</ClientOnly>
      </div>
    </div>
  );
};

export default Navbar;
