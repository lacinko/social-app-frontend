import PostItem from "@/components/PostItem";
import { convertUrlParamsIntoURLString } from "@/lib/utils";
import { useGetPostsQuery } from "@/redux/api/postApiSlice";
import { Like, Post } from "@/redux/api/types";
import { useGetMeQuery } from "@/redux/api/userApiSlice";

type HomePageProps = {};

function HomePage({}: HomePageProps) {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });
  // Define an object to represent the parameters
  const postsQueryParams = {
    include: {
      collection: true,
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
  const postsQueryString = convertUrlParamsIntoURLString(postsQueryParams);
  const {
    data: posts,
    isError,
    isFetching,
    isSuccess,
  } = useGetPostsQuery(postsQueryString);

  console.log(posts);
  return (
    <div>
      {posts &&
        posts.map((post: Post) => {
          const myLike = post.likes.find(
            (like) => like.authorId === user?.id
          ) as Like;
          return (
            <PostItem
              key={post.id}
              isDetail={false}
              {...post}
              myLike={myLike}
            />
          );
        })}
    </div>
  );
}

export default HomePage;
