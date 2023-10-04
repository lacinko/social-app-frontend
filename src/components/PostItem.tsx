import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import UserInfoHeader from "./UserInfoHeader";
import UserActionBar from "./UserActionBar";
import { Like, Comment } from "@/redux/api/types";

type PostItem = {
  id: string;
  title: string;
  content: string;
  image: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  collectionId: string;
  author: {
    name: string;
    photo: string;
  };
  isDetail: boolean;
  handleCommentFocus: () => void;
  createLike: () => void;
  likes: Like[];
  comments: Comment[];
  myLike: Like;
};

function PostItem({
  id,
  title,
  content,
  image,
  published,
  createdAt,
  updatedAt,
  authorId,
  collectionId,
  author,
  isDetail,
  handleCommentFocus,
  createLike,
  likes,
  comments,
  myLike,
}: PostItem) {
  const likesTotal = (likes as Like[]).filter((like) => like.isPositive).length;

  const dislikesTotal = (likes as Like[]).filter(
    (like) => !like.isPositive
  ).length;

  const commentsTotal = (comments as Comment[]).length;

  let innerHTML = (
    <>
      <div className="border-2 mb-1 shadow-sm container py-4">
        <UserInfoHeader author={author} createdAt={createdAt} />
        <p className="text-xl font-semibold pt-4">{title}</p>
        {isDetail && (
          <ReactQuill
            theme="snow"
            value={content}
            readOnly={true}
            className="editor"
          />
        )}
        <UserActionBar
          likes={likesTotal - dislikesTotal}
          myLike={myLike}
          comments={commentsTotal}
          url="www.test.com"
          postId={id}
        />
      </div>
    </>
  );

  if (isDetail) return innerHTML;

  return <Link to={`/post/${id}`}>{innerHTML}</Link>;
}

export default PostItem;
