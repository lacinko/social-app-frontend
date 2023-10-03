import { useState, useEffect } from "react";
import Logo from "../Logo";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import MobileMenu from "../MobileMenu";
import Avatar from "../Avatar";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { useLogoutUserMutation } from "@/redux/api/authApiSlice";
import { toast } from "@/components/ui/use-toast";

function Header() {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [logoutUser, { isLoading, isSuccess, error, isError, data }] =
    useLogoutUserMutation();

  const onLogoutHandler = () => {
    logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Logout success",
        description: "You successfully logged out",
      });
      navigate(from);
    }
  }, [isSuccess, isError, navigate, from]);

  const menuLinks = [
    {
      name: "Home",
      href: "/",
      access: "all",
      icon: <Icons.home className="h-6 w-6" />,
    },
    {
      name: "Meditations",
      href: "/meditations",
      access: "all",
      icon: <Icons.book className="h-6 w-6" />,
    },
    {
      name: "Login",
      href: "/login",
      access: "guest",
      icon: <Icons.login className="h-6 w-6" />,
    },
    {
      name: "Register",
      href: "/register",
      access: "guest",
      icon: <Icons.register className="h-6 w-6" />,
    },
    {
      name: "Profile",
      href: "/profile",
      access: "user",
      icon: <Icons.user className="h-6 w-6" />,
    },
    {
      name: "Logout",
      href: "/logout",
      access: "user",
      icon: <Icons.logout className="h-6 w-6" />,
    },
  ];

  const visibleMenuLinks = menuLinks.filter((link) =>
    user ? link.access !== "guest" : link.access !== "user"
  );

  return (
    <header className="sticky top-0 z-30">
      <div className="flex justify-between text-white items-center bg-indigo-600 container mx-auto max-w-screen-xl py-3">
        <div>
          <Logo size="small" />
        </div>

        <div className="flex items-center gap-2">
          <div id="desktop-nav" className="sm: hidden lg:block mr-6">
            <nav>
              <ul className="flex gap-2">
                {visibleMenuLinks.map((link) => {
                  let innerContent;
                  if (link.name === "Logout") {
                    innerContent = link.name;
                  } else
                    innerContent = (
                      <NavLink to={link.href}>{link.name}</NavLink>
                    );

                  return (
                    <li
                      key={link.name}
                      className="flex gap-2 cursor-pointer"
                      onClick={() => {
                        link.name === "Logout" ?? onLogoutHandler;
                      }}
                    >
                      {link.icon}
                      {innerContent}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <NavLink to="submit-post">
            <Icons.addPost className="h-8 w-8 cursor-pointer" />
          </NavLink>
          <Avatar user={user} />
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
        </div>
      </div>
      <MobileMenu
        isMenuOpen={isMenuOpen}
        closeMenu={() => setIsMenuOpen(false)}
        logoutHandler={onLogoutHandler}
        menuLinks={visibleMenuLinks}
      />
    </header>
  );
}

export default Header;
