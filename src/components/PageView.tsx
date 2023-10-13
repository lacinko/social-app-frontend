import { NavLink } from "react-router-dom";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  links: {
    href: string;
    title: string;
  }[];
};

function PageView({ links }: Props) {
  return (
    <div className="flex items-center">
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            buttonVariants({
              variant: "link",
              className: cn(
                isActive && "border-b-2 border-indigo-500",
                "flex-1 text-slate-900 hover:no-underline"
              ),
            })
          }
        >
          {link.title}
        </NavLink>
      ))}
    </div>
  );
}

export default PageView;
