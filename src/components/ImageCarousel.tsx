import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Icons } from "./Icons";

type ImageCarouselProps = {
  pictureURLs: string[];
};

function ImageCarousel({ pictureURLs }: ImageCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [hoverElement, setHoverElement] = useState("");
  const isSingleImage = pictureURLs.length === 1;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setImageIndex(
      name === "left"
        ? (imageIndex - 1 + pictureURLs.length) % pictureURLs.length
        : (imageIndex + 1) % pictureURLs.length
    );
  };

  const dotButtons: React.ReactElement[] = [];

  return (
    <div className="relative flex overflow-x-auto my-4 max-w-3xl">
      <button
        name="left"
        className={cn(
          isSingleImage && "hidden",
          "absolute p-1 bg-gray-800 bg-opacity-70 hover:bg-gray-950 text-white text-5xl top-1/2 left-0 transform -translate-y-1/2 translate-x-1/4 hover:text-slate-300  rounded-full"
        )}
        onClick={handleClick}
        onMouseEnter={() => setHoverElement("left")}
        onMouseLeave={() => setHoverElement("")}
      >
        <Icons.chevronLeft
          fill="transparent"
          className={cn(
            isSingleImage && "hidden",
            hoverElement === "left" ? "text-slate-300" : "text-white",
            "h-6 w-6"
          )}
        />
      </button>
      <img
        src={pictureURLs[imageIndex]}
        alt=""
        className={cn("w-full bg-white")}
      />

      {pictureURLs &&
        pictureURLs.map((link, idx) => {
          const dotClass = imageIndex === idx ? "bg-white" : "bg-slate-400";

          dotButtons.push(
            <button
              key={link + idx}
              name="right"
              className={cn(
                dotClass,
                "hover:bg-slate-300 w-2 h-2 z-10 rounded-full"
              )}
              onClick={() => setImageIndex(idx)}
            ></button>
          );

          return (
            <React.Fragment key={link}>
              {idx === pictureURLs.length - 1 && (
                <div
                  className={cn(
                    isSingleImage ? "hidden" : "flex",
                    "group items-center p-2 justify-center gap-2 absolute bottom-2 bg-gray-800 hover:bg-gray-950 bg-opacity-70 right-1/2 transform translate-x-1/2 rounded-md"
                  )}
                >
                  {dotButtons.map((btn) => btn)}
                </div>
              )}
            </React.Fragment>
          );
        })}
      <button
        name="right"
        className={cn(
          isSingleImage && "hidden",
          "absolute p-1 bg-gray-800 bg-opacity-70 hover:bg-gray-950 text-white text-5xl top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/4 hover:text-slate-300  rounded-full"
        )}
        onClick={handleClick}
        onMouseEnter={() => setHoverElement("right")}
        onMouseLeave={() => setHoverElement("")}
      >
        <Icons.chevronRight
          fill="transparent"
          className={cn(
            hoverElement === "right" ? "text-slate-300" : "text-white",
            "h-6 w-6"
          )}
        />
      </button>
      <div></div>
    </div>
  );
}

export default ImageCarousel;
