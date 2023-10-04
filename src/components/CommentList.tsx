import { Like, Comment } from "@/redux/api/types";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { useGetCommentsQuery } from "@/redux/api/commentApiSlice";
import { convertUrlParamsIntoURLString } from "@/lib/utils";
import { useParams } from "react-router-dom";
import CommentItem from "./CommentItem";

type CommentData = {
  comments: Comment[] | null;
  isError: boolean | null;
  isFetching: boolean | null;
};

type CommentListProps = {
  parentId: string | null;
};

function CommentList({ parentId }: CommentListProps) {
  const { postId } = useParams();

  const commentQueryParams = {
    include: {
      likes: true,
      author: {
        select: {
          name: true,
          photo: true,
        },
      },
      children: true,
    },
  };

  const commentQueryString = convertUrlParamsIntoURLString(commentQueryParams);

  const { comments, isError, isFetching } = useGetCommentsQuery<CommentData>(
    { postId, parentId, commentQueryString },
    {
      selectFromResult: ({ data }) => {
        return {
          comments: data?.data?.comments || null,
          isError: data?.error || null,
          isFetching: data?.isFetching || null,
        };
      },
    }
  );

  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  if (isFetching) return <div>Loading....</div>;
  if (isError) return <div>Failed to load</div>;

  return (
    <div className="container pt-2">
      {comments &&
        comments.map((comment) => {
          const myLike = comment?.likes?.find(
            (like) => like.authorId === user!.id
          ) as Like;

          const likesTotal = (comment?.likes as Like[])?.filter(
            (like) => like.isPositive
          ).length;

          const dislikesTotal = (comment?.likes as Like[])?.filter(
            (like) => !like.isPositive
          ).length;

          const commentsTotal = 10;
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              likesTotal={likesTotal}
              dislikesTotal={dislikesTotal}
              commentsTotal={commentsTotal}
              myLike={myLike}
            />
          );
        })}
    </div>
  );
}

export default CommentList;
