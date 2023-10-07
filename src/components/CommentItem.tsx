import { useState } from "react";
import UserInfoHeader from "./UserInfoHeader";
import UserActionBar from "./UserActionBar";
import LeaveComment from "./LeaveComment";
import CommentList from "./CommentList";
import { Like, Comment } from "@/redux/api/types";
import { Button } from "./ui/Button";

type CommentProps = {
  comment: Comment;
  likesTotal: number;
  dislikesTotal: number;
  commentsTotal: number;
  myLike: Like;
};

function CommentItem({
  comment,
  likesTotal,
  dislikesTotal,
  myLike,
}: CommentProps) {
  const [showMore, setShowMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [commentToReply, setCommentToReply] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div key={comment.id}>
        <UserInfoHeader
          collectionName={null}
          author={comment.author}
          createdAt={comment.createdAt}
          id={comment.id}
          setIsEdit={setIsEdit}
          editItemName="Comment"
        />
        {isEdit ? (
          <LeaveComment
            parentId={comment.id}
            postId={comment.postId}
            isFocused={isFocused}
            isEdit={isEdit}
            setCommentToReply={() => setCommentToReply(false)}
            setIsFocused={setIsFocused}
            setShowMore={setShowMore}
            setIsEdit={setIsEdit}
          />
        ) : (
          <div className="ml-7">
            <p>{comment.content}</p>
          </div>
        )}

        <UserActionBar
          likes={likesTotal - dislikesTotal}
          myLike={myLike}
          comments={comment.children.length}
          commentId={comment.id}
          handleComment={() => {
            setCommentToReply(!commentToReply);
            setIsFocused(true);
          }}
        />
      </div>
      {commentToReply && (
        <LeaveComment
          parentId={comment.id}
          postId={comment.postId}
          isFocused={isFocused}
          isEdit={isEdit}
          setCommentToReply={() => setCommentToReply(false)}
          setIsFocused={setIsFocused}
          setShowMore={setShowMore}
          setIsEdit={setIsEdit}
        />
      )}
      {comment?.children && comment?.children.length > 0 && (
        <Button
          className="my-4 text-xs py-1 px-2 h-full"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Hide Comments" : "Show More"}
        </Button>
      )}
      {showMore && <CommentList parentId={comment?.children[0]?.parentId} />}
    </div>
  );
}

export default CommentItem;
