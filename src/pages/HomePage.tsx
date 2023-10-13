import PostItem from "@/components/PostItem";
import SearchBar from "@/components/SearchBar";
import SortComponent from "@/components/SortComponent";
import { Button } from "@/components/ui/Button";
import { useFilter } from "@/hooks/useFilter";
import { cn, convertUrlParamsIntoURLString } from "@/lib/utils";
import { useGetCollectionsAccountsQuery } from "@/redux/api/collectionApiSlice";
import { Like, Post } from "@/redux/api/types";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  const navigate = useNavigate();
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

  const {
    isFetching,
    isError,
    filteredPosts,
    searchTerm,
    feed,
    selectedFilterOption,
    setSelectedFilterOption,
    setSearchTerm,
    setFeed,
  } = useFilter();

  const handleClickSelectFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) navigate("/login", { replace: true });
    setFeed(e.currentTarget.name);
  };

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;

  return (
    <>
      <div className="flex items-center">
        <Button
          name="Discover"
          variant={"link"}
          className={cn(
            feed === "Discover" && "border-indigo-500",
            "border-b-2 flex-1 hover:no-underline text-black"
          )}
          onClick={handleClickSelectFeed}
        >
          Discover
        </Button>
        <Button
          name="My Collections"
          variant={"link"}
          className={cn(
            feed === "My Collections" && "border-indigo-500",
            "border-b-2 flex-1 hover:no-underline text-slate-900"
          )}
          onClick={handleClickSelectFeed}
        >
          My Feed
        </Button>
      </div>
      <div>
        <div className="flex gap-2 items-center container my-2">
          <SortComponent
            selectedFilterOption={selectedFilterOption}
            setSelectedFilterOption={setSelectedFilterOption}
          />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        {filteredPosts.map((post: Post) => {
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
        })}
      </div>
    </>
  );
}

export default HomePage;
