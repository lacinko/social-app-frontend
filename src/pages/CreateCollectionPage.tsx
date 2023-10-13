import { TypeOf, literal, object, string, union } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCollectionMutation } from "@/redux/api/collectionApiSlice";
import L_Input from "@/components/Input";
import L_Label from "@/components/Label";
import { Button, buttonVariants } from "@/components/ui/Button";
import RadioGroup, { RadioItem } from "@/components/RadioGroup";
import { Icons } from "@/components/Icons";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import PageView from "@/components/PageView";

function CreateCollectionPage() {
  const [createCollection, { isLoading, isSuccess, error, isError, data }] =
    useCreateCollectionMutation();

  const CollectionSchema = object({
    name: string().min(1, "Name is required"),
    type: union([literal("PUBLIC"), literal("RESTRICTED"), literal("PRIVATE")]),
    nsfw: string(),
    accountRole: union([
      literal("ADMIN"),
      literal("MODERATOR"),
      literal("USER"),
    ]),
  });

  type TCollection = TypeOf<typeof CollectionSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCollection>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: {
      name: "",
      type: "PUBLIC",
      nsfw: "",
      accountRole: "ADMIN",
    },
  });

  const onSubmitHandler: SubmitHandler<TCollection> = async (
    values: TCollection
  ) => {
    const formValues = {
      ...values,
      type: values.type.toUpperCase(),
      nsfw: values.nsfw === "nsfw",
    };
    try {
      await createCollection(formValues);
    } catch (err) {
      console.log(err);
    }
  };

  const errorKey = "name" as keyof TCollection;

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast({
        title: "Collection created!",
        description: "You collection has been created successfully!",
      });
    }
  }, [isSuccess, reset]);

  return (
    <>
      <PageView
        links={[
          { href: "/create-collection", title: "Create Collection" },
          { href: "/submit-post", title: "Create Post" },
        ]}
      />
      <div className="container py-4">
        <h1 className="font-bold text-xl">Create a colleciton</h1>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col"
        >
          <L_Label
            error={!!errors[errorKey]}
            htmlFor="name"
            className="font-semibold text-base pt-2 text-gray-900"
          >
            Name
          </L_Label>

          <L_Input
            id="name"
            name="name"
            type="text"
            register={register}
            aria-invalid={errors[errorKey] ? "true" : "false"}
            aria-describedby={
              errors[errorKey]
                ? `name - ${errors[errorKey]?.message}`
                : "The name of the collection"
            }
            required
            className="focus-visible:ring-indigo-600 mt-3"
          />
          <p className="font-semibold text-base pt-6 text-gray-900">
            Collection type
          </p>
          <RadioGroup id="type" className="flex flex-col gap-5 pt-3">
            <div className="flex gap-2 items-start">
              <RadioItem
                value="PUBLIC"
                name="type"
                className="mt-2 accent-indigo-600"
                register={register}
              />
              <div className="flex gap-2">
                <Icons.user className="h-10 w-10" />
                <p className="text-sm leading-6 flex flex-col text-gray-900">
                  <span className="font-medium pr-2">Public</span>
                  Anyone can view, post, and comment to this collection
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <RadioItem
                value="RESTRICTED"
                name="type"
                className="mt-2 accent-indigo-600"
                register={register}
              />
              <div className="flex gap-2">
                <Icons.visible className="h-10 w-10" />
                <p className="text-sm leading-6 flex flex-col text-gray-900">
                  <span className="font-medium pr-2">Restricted</span> Anyone
                  can view this collection, but only approved users can post
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <RadioItem
                value="PRIVATE"
                name="type"
                className="mt-2 accent-indigo-600"
                register={register}
              />
              <div className="flex gap-2">
                <Icons.lockClosed className="h-10 w-10" />
                <p className="text-sm leading-6 flex flex-col text-gray-900">
                  <span className="font-medium pr-2">Private</span>Only approved
                  users can view and submit to this collection
                </p>
              </div>
            </div>
          </RadioGroup>
          <p className="font-semibold text-lg pt-6 text-gray-900">
            Adult content
          </p>
          <div className="flex gap-2 items-start mt-3">
            <div className="flex items-center mb-4">
              <input
                id="nsfw"
                type="checkbox"
                value="nsfw"
                {...register("nsfw")}
                className="w-4 h-4 accent-indigo-600 text-indigo-600 bg-gray-100 border-gray-100 rounded focus:ring-gray-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="nsfw"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                18+ year old community
              </label>
            </div>
          </div>
          {(errors[errorKey] || error) && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {errors[errorKey]?.message || error.data.message}
            </p>
          )}
          <div className="pt-8">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCollectionPage;
