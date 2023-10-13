import { Icons } from "./Icons";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative group flex items-center h-10 w-full border-none ring-0">
      <Icons.search className="absolute h-5 w-5 ml-3" />
      <input
        value={searchTerm}
        className="w-full pl-10 pr-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-indigo-600"
        placeholder="Search Posts..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
