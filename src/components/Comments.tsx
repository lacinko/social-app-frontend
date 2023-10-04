import { useState } from "react";
import { convertUrlParamsIntoURLString } from "@/lib/utils";
import { useGetCommentsQuery } from "@/redux/api/commentApiSlice";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { useGetMeQuery } from "@/redux/api/userApiSlice";

function Comments() {
  //const [isFocused, setIsFocused] = useState(false);
  //const parentId = "6bf63c7b-05fb-4dd5-9d98-94d2dad84177";
  /*const commentQueryParams = {
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
  /*const commentQueryString = convertUrlParamsIntoURLString(commentQueryParams);

  const { comments, isFetching, isError } = useGetCommentsQuery(
    { postId, commentQueryString },
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

  console.log(comments);*/

  return (
    <CommentList
      parentId={null}
      handleCommentFocus={() => setIsFocused(!isFocused)}
    />
  );
}

export default Comments;
