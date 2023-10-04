import { Comment, IUser, Like } from "@/redux/api/types";
import UserActionBar from "./UserActionBar";
import UserInfoHeader from "./UserInfoHeader";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { useState } from "react";
import LeaveComment from "./LeaveComment";
import { useGetCommentsQuery } from "@/redux/api/commentApiSlice";
import { convertUrlParamsIntoURLString } from "@/lib/utils";
import { useParams } from "react-router-dom";
import CommentItem from "./Comment";

type CommentListProps = {
  parentId: string | null;
};

function CommentList({ parentId }: CommentListProps) {
  const [showMore, setShowMore] = useState("");
  const { postId } = useParams();
  //const parentId = "6bf63c7b-05fb-4dd5-9d98-94d2dad84177";
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
  /*
  const commentQueryParams = {
    include: {
      likes: true,
      author: {
        select: {
          name: true,
          photo: true,
        },
      },
      children: {
        include: {
          likes: true,
          children: {
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
*/
  const commentQueryString = convertUrlParamsIntoURLString(commentQueryParams);

  const { comments, parent, isFetching, isError } = useGetCommentsQuery(
    { postId, parentId, commentQueryString },
    {
      selectFromResult: ({ data }) => {
        return {
          comments: data?.data?.comments || null,
        };
      },
    }
  );

  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  console.log(parent);

  return (
    <div className="container pt-2">
      {comments &&
        comments.map((comment) => {
          const myLike = comment?.likes?.find(
            (like) => like.authorId === user.id
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
