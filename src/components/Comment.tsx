import { useState } from "react";
import UserInfoHeader from "./UserInfoHeader";
import UserActionBar from "./UserActionBar";
import LeaveComment from "./LeaveComment";
import CommentList from "./CommentList";

type CommentProps = {
  comment: Comment[];
  likesTotal: number;
  dislikesTotal: number;
  commentsTotal: number;
  myLike: Comment;
};

function Comment({
  comment,
  likesTotal,
  dislikesTotal,
  commentsTotal,
  myLike,
}: CommentProps) {
  const [showMore, setShowMore] = useState(false);
  const [commentToReply, setCommentToReply] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const showCommentReplyInput = (commentId: string) => {
    console.log(commentId);
    if (commentId)
      setCommentToReply((prevId) => {
        if (prevId === commentId) return "";
        return commentId;
      });
  };

  return (
    <div>
      <div key={comment.id}>
        <UserInfoHeader author={comment.author} createdAt={comment.createdAt} />
        <div className="ml-7">
          <p>{comment.content}</p>
        </div>

        <UserActionBar
          likes={likesTotal - dislikesTotal}
          myLike={myLike}
          comments={commentsTotal}
          commentId={comment.id}
          handleComment={() => showCommentReplyInput(comment.id)}
        />
      </div>
      {commentToReply === comment.id && (
        <LeaveComment parentId={comment.id} postId={comment.postId} />
      )}
      {comment?.children && comment?.children.length > 0 && (
        <button
          onClick={() =>
            setShowMore((prevVal) => {
              if (prevVal === comment.id) return "";
              return comment.id;
            })
          }
        >
          Show More
        </button>
      )}
      {showMore === comment.id && (
        <CommentList parentId={comment?.children[0]?.parentId} />
      )}
    </div>
  );
}

export default Comment;
