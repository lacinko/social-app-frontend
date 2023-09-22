import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

type MobileMenuProps = {
  isMenuOpen: boolean;
  menuLinks: {
    name: string;
    href: string;
    access: string;
  }[];
};

function MobileMenu({ isMenuOpen, menuLinks }: MobileMenuProps) {
  return (
    <div
      id="mobile-nav"
      className={cn(
        isMenuOpen ? "translate-y-4 scroll-mt-10" : "animate-close-menu",
        "lg:hidden"
      )}
    >
      <nav>
        <ul>
          {menuLinks.map((link) => (
            <li key={link.name} className="py-1">
              <NavLink to={link.href}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
