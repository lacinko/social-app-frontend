import { cn } from "@/lib/utils";

type MobileMenuProps = {
  isMenuOpen: boolean;
};

function MobileMenu({ isMenuOpen }: MobileMenuProps) {
  return (
    <div
      id="mobile-nav"
      className={cn(
        isMenuOpen ? "animate-open-menu" : "animate-close-menu",
        "lg:hidden"
      )}
    >
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
  );
}

export default MobileMenu;
