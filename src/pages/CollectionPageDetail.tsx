import PostItem from "@/components/PostItem";
import { Button } from "@/components/ui/Button";
import { cn, convertUrlParamsIntoURLString } from "@/lib/utils";
import { useGetCollectionQuery } from "@/redux/api/collectionApiSlice";
import { useLazyGetPostsByCollectionQuery } from "@/redux/api/postApiSlice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type screenView = "Posts" | "About" | "Members";

function CollectionPageDetail() {
  const { collectionId } = useParams();

  // Define an object to represent the parameters
  const collectionQueryParams = {
    include: {
      members: true,
    },
  };

  // Convert the object to a URL-encoded query string
  const collectionQueryString = convertUrlParamsIntoURLString(
    collectionQueryParams
  );

  const {
    currentData: collection,
    isLoading,
    isError,
    error,
  } = useGetCollectionQuery({ collectionId, collectionQueryString });

  // Define an object to represent the parameters
  const postQueryParams = {
    include: {
      comments: true,
      likes: true,
      author: {
        select: {
          name: true,
          photo: true,
        },
      },
    },
  };

  // Convert the object to a URL-encoded query string
  const postQueryString = convertUrlParamsIntoURLString(postQueryParams);

  const [
    getPostsByCollection,
    {
      currentData: posts,
      isLoading: isPostsLoading,
      isError: isPostsError,
      error: postsError,
    },
  ] = useLazyGetPostsByCollectionQuery();

  const membersNumber = collection && collection.members.length;
  let screenViewContent = null;

  const [screenView, setScreenView] = useState<screenView>("Posts");

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    getPostsByCollection({ collectionId, postQueryString });
  }, [collectionId]);

  if (isLoading) return <div>Loading...</div>;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const view = e.currentTarget.textContent as screenView;
    switch (view) {
      case "Posts":
        await getPostsByCollection({ collectionId, postQueryString });
        break;
      default:
        break;
    }
    setScreenView(view);
  };

  if (screenView === "Posts") {
    screenViewContent =
      posts && posts.map((post) => <PostItem key={post.id} {...post} />);
  }
  if (screenView === "About") {
    screenViewContent = <>About</>;
  }
  if (screenView === "Members") {
    screenViewContent = <>Members</>;
  }

  return (
    <div>
      <div
        id="collection-page-header"
        className="bg-gradient-to-b from-gray-200 from-50% to-50%"
      >
        <div className="flex flex-col items-center pt-8 container">
          <div className="flex justify-end w-full">
            <Button className="bg-indigo-500 hover:bg-indigo-600">
              Joined{" "}
            </Button>
          </div>
          <img
            src="https://clipart-library.com/newhp/52-524263_old-library-building-svg-png-icon-free-download.png"
            alt="collection image"
            className="w-28 h-28 rounded-full border-2 border-black shadow-lg"
          />
          <h1 className="font-bold text-2xl bg-indigo-500 text-white py-3 -mt-4 px-12 rounded-tl-full rounded-br-full">
            {collection.name}
          </h1>
          <p className="py-2 font-medium">Members: {membersNumber}</p>
        </div>
      </div>
      <div id="collection-nav" className="flex">
        <Button
          variant={"ghost"}
          className={cn(
            screenView === "Posts" && "border-indigo-500",
            "flex-1 border-b-2"
          )}
          onClick={handleClick}
        >
          Posts
        </Button>
        <Button
          variant={"ghost"}
          className={cn(
            screenView === "About" && "border-indigo-500",
            "flex-1 border-b-2"
          )}
          onClick={handleClick}
        >
          About
        </Button>
        <Button
          variant={"ghost"}
          className={cn(
            screenView === "Members" && "border-indigo-500",
            "flex-1 border-b-2"
          )}
          onClick={handleClick}
        >
          Members
        </Button>
      </div>

      <div>{screenViewContent}</div>
    </div>
  );
}

export default CollectionPageDetail;
