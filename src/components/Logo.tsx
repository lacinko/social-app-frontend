import { cn } from "@/lib/utils";

type Props = {
  size: "small" | "medium" | "large";
};

function Logo({ size }: Props) {
  return (
    <div>
      <h1 className="uppercase tracking-widest font-bold text-center">
        Meditations
      </h1>
      <p
        className={cn(
          size === "small" && "hidden",
          "tracking-tighter italic text-gray-500 text-center"
        )}
      >
        “The soul becomes dyed with the colour of its thoughts.”
      </p>
    </div>
  );
}

export default Logo;
