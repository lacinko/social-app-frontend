import { useState } from "react";
import Logo from "../Logo";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import MobileMenu from "../MobileMenu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="container mx-auto max-w-screen-xl py-3 sticky top-0 z-10 bg-indigo-600 text-white">
      <div className="flex justify-between items-center">
        <div>
          <Logo size="small" />
        </div>
        <div id="desktop-nav" className="sm: hidden lg:block">
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/meditations">Meditations</a>
              </li>
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </nav>
        </div>
        <Button
          id="mobile-menu-button"
          className="inline-flex flex-col gap-1 border-white border-2 rounded-md p-1.5 h-full lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={cn(
              isMenuOpen && "-rotate-45 delay-200 translate-y-1.5",
              "w-5 h-[2px] bg-white transform transition duration-300 ease-in-out"
            )}
          ></div>
          <div
            className={cn(
              isMenuOpen ? "w-0" : "w-5",
              "h-[2px] bg-white transform transition-all duration-200 ease-in-out"
            )}
          ></div>
          <div
            className={cn(
              isMenuOpen && "rotate-45 delay-200 -translate-y-1.5",
              "w-5 h-[2px] bg-white transform transition duration-300 ease-in-out"
            )}
          ></div>
        </Button>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} />
    </header>
  );
}

export default Header;
