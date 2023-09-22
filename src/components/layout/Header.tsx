import { useState } from "react";
import Logo from "../Logo";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import MobileMenu from "../MobileMenu";
import Avatar from "../Avatar";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { NavLink } from "react-router-dom";

function Header() {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = [
    {
      name: "Home",
      href: "/",
      access: "all",
    },
    {
      name: "Meditations",
      href: "/meditations",
      access: "all",
    },
    {
      name: "Login",
      href: "/login",
      access: "guest",
    },
    {
      name: "Register",
      href: "/register",
      access: "guest",
    },
    {
      name: "Profile",
      href: "/profile",
      access: "user",
    },
    {
      name: "Logout",
      href: "/logout",
      access: "user",
    },
  ];

  const visibleMenuLinks = menuLinks.filter((link) =>
    user ? link.access !== "guest" : link.access !== "user"
  );

  return (
    <header className="container mx-auto max-w-screen-xl py-3 sticky top-0 z-10 bg-indigo-600 text-white">
      <div className="flex justify-between items-center">
        <div>
          <Logo size="small" />
        </div>

        <div className="flex items-center gap-2">
          <Avatar />
          <Button
            id="mobile-menu-button"
            className="inline-flex flex-col gap-1 border-white border-2 rounded-md p-1 h-8 lg:hidden"
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
          <div id="desktop-nav" className="sm: hidden lg:block">
            <nav>
              <ul>
                {visibleMenuLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink to={link.href}>{link.name}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} menuLinks={visibleMenuLinks} />
    </header>
  );
}

export default Header;
