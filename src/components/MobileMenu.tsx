import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

type MobileMenuProps = {
  isMenuOpen: boolean;
  menuLinks: {
    name: string;
    href: string;
    access: string;
    icon?: JSX.Element;
  }[];
  closeMenu: () => void;
  logoutHandler: () => void;
};

function MobileMenu({
  isMenuOpen,
  menuLinks,
  closeMenu,
  logoutHandler,
}: MobileMenuProps) {
  const onClick = (isLogout: boolean) => {
    if (isLogout) logoutHandler();
    closeMenu();
  };

  return (
    <div
      id="mobile-nav"
      className={cn(
        isMenuOpen ? "translate-y-0" : "-translate-y-[100dvh]",
        "lg:hidden",
        " text-white bg-indigo-600 container mx-auto max-w-screen-xl py-3 transition-transform duration-300 ease-in-out transform fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center -z-10"
      )}
    >
      <nav>
        <ul>
          {menuLinks.map((link) => {
            let innerContent;
            if (link.name === "Logout") {
              innerContent = link.name;
            } else innerContent = <NavLink to={link.href}>{link.name}</NavLink>;

            return (
              <li
                key={link.name}
                className="flex gap-2 py-1"
                onClick={() => onClick(link.name === "Logout")}
              >
                {link.icon}
                {innerContent}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
