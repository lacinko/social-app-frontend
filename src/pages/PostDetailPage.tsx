import CommentList from "@/components/CommentList";
import LeaveComment from "@/components/LeaveComment";
import PostItem from "@/components/PostItem";
import { convertUrlParamsIntoURLString } from "@/lib/utils";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useUpdateLikeMutation,
} from "@/redux/api/likeApiSlice";
import { useGetPostQuery } from "@/redux/api/postApiSlice";
import { Like } from "@/redux/api/types";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

function PostDetailPage() {
  const { postId = "" } = useParams<{ postId: string }>();
  const [isFocused, setIsFocused] = useState(false);

  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  const [createLike] = useCreateLikeMutation();
  const [updateLike] = useUpdateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();

  // Define an object to represent the parameters
  const postQueryParams = {
    include: {
      collection: true,
      author: true,
      likes: true,
      comments: {
        include: {
          likes: true,
          author: {
            select: {
              name: true,
              photo: true,
            },
          },
        },
      },
    },
  };

  // Convert the object to a URL-encoded query string
  const postQueryString = convertUrlParamsIntoURLString(postQueryParams);

  const {
    currentData: post,
    isLoading,
    isError,
    error,
  } = useGetPostQuery({
    postId,
    postQueryString,
  });

  if (isLoading) return <div>Loading....</div>;

  const collection = post?.collection ?? {};
  const comments = post?.comments ?? [];
  const myLike = (post?.likes as Like[]).find(
    (like) => like.authorId === user?.id
  );
  const isLiked = !!myLike;

  console.log(post);

  const handleLike = async (
    event: React.MouseEvent<HTMLButtonElement>,
    isPositive: boolean
  ) => {
    try {
      const { name } = event.currentTarget;
      const likeState = myLike?.isPositive ? "like" : "dislike";

      if (isLiked && likeState === name) {
        await deleteLike({ postId });
      }

      if (isLiked) {
        await updateLike({
          postId: postId,
          isPositive: isPositive,
        });
      } else {
        await createLike({
          postId: postId,
          isPositive: isPositive,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center py-2 shadow-md rounded-xl">
        <img
          src="https://clipart-library.com/newhp/52-524263_old-library-building-svg-png-icon-free-download.png"
          alt="collection image"
          className="w-20 h-20 rounded-full border-2 border-black shadow-lg"
        />
        <h1 className="font-bold text-xl bg-indigo-500 text-white py-1 -mt-4 px-12 rounded-tl-full rounded-br-full">
          {collection.name}
        </h1>
      </div>
      {post && (
        <PostItem
          {...post}
          myLike={myLike}
          isDetail={true}
          handleCommentFocus={() => setIsFocused(!isFocused)}
          createLike={handleLike}
        />
      )}
      <LeaveComment
        user={user}
        postId={postId}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
      <CommentList
        comments={comments}
        handleCommentFocus={() => setIsFocused(!isFocused)}
      />
    </div>
  );
}

export default PostDetailPage;
