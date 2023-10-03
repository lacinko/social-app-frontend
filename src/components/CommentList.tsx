import { Like } from "@/redux/api/types";
import UserActionBar from "./UserActionBar";
import UserInfoHeader from "./UserInfoHeader";

type Comment = {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    name: string;
    photo: string;
  };
  likes: Like[];
};

type CommentListProps = {
  comments: Comment[];
  myLike: Like;
  handleCommentFocus: () => void;
  createLike: () => void;
};

function CommentList({
  comments,
  myLike,
  handleCommentFocus,
  createLike,
}: CommentListProps) {
  return (
    <div className="container pt-2">
      {comments.map((comment) => {
        const likesTotal = (comment?.likes as Like[]).filter(
          (like) => like.isPositive
        ).length;

        const dislikesTotal = (comment?.likes as Like[]).filter(
          (like) => !like.isPositive
        ).length;

        const commentsTotal = 10;
        return (
          <div key={comment.id}>
            <UserInfoHeader
              author={comment.author}
              createdAt={comment.createdAt}
            />
            <div className="ml-7">
              <p>{comment.content}</p>
            </div>

            <UserActionBar
              likes={likesTotal - dislikesTotal}
              myLike={myLike}
              comments={commentsTotal}
              url="www.test.com"
              handleComment={handleCommentFocus}
              handleLike={createLike}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;
