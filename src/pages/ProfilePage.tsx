import { useGetMeQuery, useUpdateUserMutation } from "@/redux/api/userApiSlice";
import L_Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useFilter } from "@/hooks/useFilter";
import { useEffect } from "react";
import { Like, Post } from "@/redux/api/types";
import PostItem from "@/components/PostItem";
import { convertUrlParamsIntoURLString } from "@/lib/utils";
import { useGetCollectionsAccountsQuery } from "@/redux/api/collectionApiSlice";

function ProfilePage() {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  const [updateUser] = useUpdateUserMutation();

  const { register, handleSubmit } = useForm();

  const { isFetching, isError, filteredPosts, setFeed } = useFilter();

  const collectionsAccountsQueryParams = {
    where: {
      userId: user?.id,
    },
  };

  const collectionsAccountsQueryString = convertUrlParamsIntoURLString(
    collectionsAccountsQueryParams
  );
  const { data: userCollections } = useGetCollectionsAccountsQuery(
    collectionsAccountsQueryString
  );

  const onSubmitHandler = (values) => {
    console.log(values);
    updateUser(values);
  };

  useEffect(() => {
    setFeed("My Posts");
  }, [user]);

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
            <label className="absolute z-10 bottom-0 h-20 w-20">
              <Icons.upload className="absolute h-9 w-9 bottom-0 right-0" />
              <input
                type="file"
                id="photo"
                className="hidden"
                {...register("photo")}
              />
            </label>
            <img
              src={user?.photo && "/avatar-images/augustus.png"}
              alt="profile-picture"
              className="absolute top-0"
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
