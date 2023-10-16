import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { toast } from "./ui/use-toast";
import { UseFormSetValue } from "react-hook-form";

type FileDropProps = {
  setValue: UseFormSetValue<any>;
  formImages: File[];
};

function FileDrop({ setValue, formImages }: FileDropProps) {
  const [isFileDragged, setIsFileDragged] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([...formImages]);
  const handleDragEnter = () => {
    setIsFileDragged(true);
  };
  const handleDragLeave = (ev: DragEvent) => {
    if (ev.clientX === 0) setIsFileDragged(false);
  };
  const handleOnDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsFileDragged(false);
    setIsOver(false);

    // Fetch the files
    const droppedFiles = Array.from(ev.dataTransfer.files);
    if (droppedFiles.length + files.length > 5) {
      toast({
        description: "Can't exceed limit of 5 images per post",
      });
      return;
    }
    setFiles([...files, ...droppedFiles]);

    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        //console.log(reader.result);
      };

      reader.onerror = () => {
        console.error("There was an issue reading the file.");
      };

      reader.readAsDataURL(file);
      return reader;
    });
  };
  const handleOnDragOverDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsOver(true);
  };
  const handleOnDragLeaveDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsOver(false);
  };

  const handleOnClickFilesState = (fileName: string) => {
    setFiles([...files].filter((file) => file.name !== fileName));
  };

  const calculateSizeInKB = (size: number) => {
    return size < 1000000
      ? `${Math.floor(size / 1024)} KB`
      : `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleOnChangeUploadImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = e.target.files && e.target.files;
    if (selectedFiles) {
      if (selectedFiles.length + files.length > 5) {
        toast({
          description: "Can't exceed limit of 5 images per post",
        });
        return;
      }
      setFiles([...files, ...Array.from(selectedFiles)]);
    }
  };

  useEffect(() => {
    setValue("images", files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div
        id="drop_zone"
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOverDrop}
        onDragLeave={handleOnDragLeaveDrop}
        className={cn(
          files.length === 5 && "opacity-80",
          isOver && "ring-offset-2 ring-2 ring-indigo-500",
          isFileDragged && "bg-slate-100",
          "relative flex justify-center items-center border-2 border-slate-200 p-4 rounded-md aspect-video w-full max-w-xl mx-auto"
        )}
      >
        <label className="absolute  bottom-0 h-full w-full hover:cursor-pointer">
          <input
            type="file"
            id="images"
            className="hidden"
            multiple={true}
            onChange={handleOnChangeUploadImages}
          />
        </label>
        <div
          className={cn(
            files.length <= 1 ? "grid-cols-1" : "grid-cols-2",
            "grid place-items-center md:grid-cols-3"
          )}
        >
          {files.length > 0 ? (
            files.map((file) => (
              <div
                className="flex flex-col items-center"
                key={file.lastModified}
              >
                <div className="relative flex-1">
                  <Icons.jpeg className="h-12 w-16" fill="#000" />
                  <Button
                    variant={"outline"}
                    className="rounded-full aspect-square h-5 px-2 py-3 absolute right-0 top-0"
                    onClick={() => handleOnClickFilesState(file.name)}
                  >
                    X
                  </Button>
                </div>
                <p>{file.name}</p>
                <p className="text-sm font-medium">
                  {calculateSizeInKB(file.size)}
                </p>
              </div>
            ))
          ) : (
            <>
              <Icons.photo
                className="h-20 w-20"
                fillSky={isOver ? "blue" : "white"}
                fillHills={isOver ? "green" : "white"}
                borderSun={
                  isOver
                    ? "transition-all duration-300 delay-150 ease-out text-yellow-500"
                    : "white"
                }
              />
              <p>
                Drag one or more pictures to this <i>drop zone</i>.
              </p>
            </>
          )}
        </div>
      </div>
      {files.length === 5 && (
        <p className="font-bold">You have reached maximum number of images</p>
      )}
    </div>
  );
}

export default FileDrop;
