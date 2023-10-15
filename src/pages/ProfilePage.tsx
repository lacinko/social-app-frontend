import { useGetMeQuery, useUpdateUserMutation } from "@/redux/api/userApiSlice";
import L_Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useFilter } from "@/hooks/useFilter";
import { useEffect, useState } from "react";
import { Like, Post } from "@/redux/api/types";
import PostItem from "@/components/PostItem";
import { convertUrlParamsIntoURLString } from "@/lib/utils";
import { useGetCollectionsAccountsQuery } from "@/redux/api/collectionApiSlice";
import { TypeOf, object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const imageUploadSchema = object({
  username: z
    .string()
    .min(3, "Username can't be shorter than 3 characters")
    .max(30, "Username can't be longer than 30 characters"),
  photo: z.instanceof(File).or(z.string()),
});

type IUploadImage = TypeOf<typeof imageUploadSchema>;

function ProfilePage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  const [updateUser, { isError: isUpdateUserError }] = useUpdateUserMutation();

  const { register, handleSubmit, formState, setValue } = useForm<IUploadImage>(
    {
      resolver: zodResolver(imageUploadSchema),
      defaultValues: {
        username: user?.name,
        photo: user?.photo,
      },
    }
  );

  const { isFetching, isError, filteredPosts, setFeed } = useFilter();

  const collectionsAccountsQueryParams = {
    where: {
      userId: user?.id,
    },
  };

  const profilePictureSrc = imageSrc
    ? imageSrc
    : `${import.meta.env.VITE_SERVER_ENDPOINT}/images/profile/${user?.photo}`;

  const collectionsAccountsQueryString = convertUrlParamsIntoURLString(
    collectionsAccountsQueryParams
  );
  const { data: userCollections } = useGetCollectionsAccountsQuery(
    collectionsAccountsQueryString
  );

  const onSubmitHandler = (values: IUploadImage) => {
    console.log(values);

    const formData = new FormData();

    formData.append("image", values.photo);
    formData.append("name", values.username);

    // Call the Upload API
    updateUser(formData);
  };

  const handleOnChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      // Create a FileReader to read the selected file as a data URL
      const reader = new FileReader();

      reader.onload = (e) => {
        // Set the data URL as the source for the image element
        const imgURL = e.target ? (e.target.result as string) : null;
        setImageSrc(imgURL);
      };

      reader.readAsDataURL(selectedFile);
      setValue("photo", selectedFile);
    } else {
      setImageSrc(null); // Clear the image if no file is selected
    }
  };

  useEffect(() => {
    setFeed("My Posts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setImageSrc(null);
  }, [isUpdateUserError]);

  let posts;

  if (isFetching) posts = <div>Loading...</div>;

  if (isError) posts = <div>Error, leading posts.</div>;

  if (filteredPosts.length > 0 && !isError)
    posts = filteredPosts.map((post: Post) => {
      const myLike = post.likes.find(
        (like) => like.authorId === user?.id
      ) as Like;

      const isMember = userCollections
        ? !!userCollections[post.collectionId]
        : false;

      return (
        <PostItem
          isMember={isMember}
          key={post.id}
          isDetail={false}
          {...post}
          myLike={myLike}
        />
      );
    });

  if (filteredPosts.length === 0 && !isError)
    posts = <div>You haven't created a post yet.</div>;

  return (
    <div className="container py-4">
      <h1 className="font-semibold text-lg py-2 text-gray-900">
        Profile Information
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {formState.errors.username?.message}
        {formState.errors.photo?.message}
        <section>
          <h2 className="text-base font-medium">Username</h2>
          <p className="text-sm">
            Set a display name. This does not change your username.
          </p>
          <L_Input
            id="username"
            register={register}
            placeholder={user?.name}
            className="mt-3"
          />
        </section>
        <section>
          <h2 className="text-base font-medium">Profile Picture</h2>
          <p className="text-sm">Images must be .png or .jpg format</p>
          <div className="relative h-20 w-20 mt-3">
            <label className="absolute z-10 bottom-0 h-20 w-20 hover:cursor-pointer">
              <Icons.upload className="absolute h-9 w-9 bottom-0 right-0" />
              <input
                type="file"
                id="photo"
                className="hidden"
                {...register("photo")}
                onChange={handleOnChangePicture}
              />
            </label>
            <img
              src={profilePictureSrc}
              alt="profile-picture"
              className="absolute object-cover aspect-square top-0 rounded-full"
            />
          </div>
        </section>
        <div>
          <Button type="submit" className="w-full" isLoading={false}>
            Save Changes
          </Button>
        </div>
      </form>
      <h1 className="font-semibold text-lg py-2 mt-4 text-gray-900">
        My Posts
      </h1>
      <section>{posts}</section>
    </div>
  );
}

export default ProfilePage;
