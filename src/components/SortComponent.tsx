import { useState } from "react";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

type SortComponentProps = {
  filterOptions?: Array<string>;
  selectedFilterOption: string;
  setSelectedFilterOption: React.Dispatch<React.SetStateAction<string>>;
};

function SortComponent({
  filterOptions = ["Top", "New", "Best", "Hot"],
  selectedFilterOption,
  setSelectedFilterOption,
}: SortComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (option: string) => {
    if (option === "") return setIsMenuOpen(!isMenuOpen);

    setSelectedFilterOption(option);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          variant={"outline"}
          className="flex items-center gap-3"
          onClick={() => handleClick("")}
        >
          <span>{selectedFilterOption}</span>{" "}
          {isMenuOpen ? (
            <Icons.chevronUp className="h-4 w-4" />
          ) : (
            <Icons.chevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div
        className={cn(
          !isMenuOpen
            ? "animate-open-dropdown hidden"
            : "animate-close-dropdown ",
          "absolute right-0 z-10 mt-2 bg-white w-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        {filterOptions.map((opt, idx) => (
          <p
            key={opt}
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            id={`menu-item-${idx}`}
            onClick={() => handleClick(opt)}
          >
            {opt}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SortComponent;
