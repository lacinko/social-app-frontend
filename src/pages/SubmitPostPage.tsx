import { useGetCollectionsQuery } from "@/redux/api/collectionApiSlice";
import L_Label from "@/components/Label";
import L_Input from "@/components/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/Icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TypeOf, object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePostMutation } from "@/redux/api/postApiSlice";
import { toast } from "@/components/ui/use-toast";

type screenView = "Post" | "Images" | "Link" | "Poll";

function SubmitPostPage() {
  const [screenView, setScreenView] = useState<screenView>("Post");
  const {
    isLoading,
    isSuccess,
    isError,
    currentData: collections,
  } = useGetCollectionsQuery({});
  const [createPost, { isSuccess: isPostSubmitSuccess }] =
    useCreatePostMutation();

  const postSchema = object({
    collectionId: string().min(1, "Collection is required"),
    title: string().min(1, "Title is required"),
    content: string().min(1, "Content is required"),
    image: string().min(1, "Image is required"),
  });

  type TPost = TypeOf<typeof postSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TPost>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      collectionId: collections[0].id,
      title: "",
      content: "",
      image: "default-image.jpg",
    },
  });

  const onSubmitHandler: SubmitHandler<TPost> = async (values: TPost) => {
    try {
      console.log(values);
      await createPost(values);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    register("content");
  }, [register]);

  useEffect(() => {
    if (isPostSubmitSuccess) {
      toast({
        title: "Post created successfully!",
        description: "Your post is now public and visible",
      });
      reset();
    }
  }, [isPostSubmitSuccess, reset]);

  const onEditorStateChange = (editorState: string) => {
    setValue("content", editorState);
  };

  const editorContent = watch("content");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const view = e.currentTarget.name as screenView;
    setScreenView(view);
  };

  const handleSelectCollection = (e: React.MouseEvent<HTMLSelectElement>) => {
    const collectionId = e.currentTarget.value;
    setValue("collectionId", collectionId);
  };

  if (isLoading) return <div>Loading...</div>;

  console.log(errors);

  return (
    <div className="container py-3">
      <div>
        <div
          id="#submit-post-page__header"
          className="flex flex-col justify-between "
        >
          <h1 className="font-bold text-xl">Create a post</h1>
          <L_Label htmlFor="collection" className="pt-4 pb-2">
            Collection
          </L_Label>
          <select
            name=""
            id=""
            className={cn(
              errors["collectionId"] && "border-destructive",
              "border p-2 rounded-md"
            )}
            onClick={handleSelectCollection}
          >
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
          {errors["collectionId"] && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {errors["collectionId"]?.message}
            </p>
          )}
        </div>
        <div id="submit-post-page__editor" className="flex flex-wrap mt-4">
          <Button
            name="Post"
            variant={"ghost"}
            className={cn(
              screenView === "Post" && "border-indigo-500",
              "flex-auto border-b-2 w-1/2"
            )}
            onClick={handleClick}
          >
            <Icons.document className="h-7 w-7 pr-2" /> Post
          </Button>
          <Button
            name="Images"
            variant={"ghost"}
            className={cn(
              screenView === "Images" && "border-indigo-500",
              "flex-auto border-b-2 w-1/2"
            )}
            onClick={handleClick}
          >
            <Icons.photo className="h-7 w-7 pr-2" /> Images
          </Button>
          <Button
            name="Link"
            variant={"ghost"}
            className={cn(
              screenView === "Link" && "border-indigo-500",
              "flex-auto border-b-2 w-1/2"
            )}
            onClick={handleClick}
          >
            <Icons.link className="h-7 w-7 pr-2" /> Link
          </Button>
          <Button
            name="Poll"
            variant={"ghost"}
            className={cn(
              screenView === "Poll" && "border-indigo-500",
              "flex-auto border-b-2 w-1/2"
            )}
            onClick={handleClick}
          >
            <Icons.list className="h-7 w-7 pr-2" /> Poll
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <L_Input
            id="title"
            name="title"
            type="text"
            register={register}
            aria-invalid={errors["title"] ? "true" : "false"}
            aria-describedby={
              errors["title"]
                ? `title - ${errors["title"]?.message}`
                : "Post title field value"
            }
            required
            className={cn(
              errors["title"] && "border-destructive",
              "focus-visible:ring-indigo-600 mt-4"
            )}
          />
          {errors["title"] && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {errors["title"]?.message}
            </p>
          )}
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={onEditorStateChange}
            className={cn(
              errors["content"] && "border-destructive border rounded-md",
              "mt-4"
            )}
          />
          {errors["content"] && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {errors["content"]?.message}
            </p>
          )}
          <div>
            <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitPostPage;
