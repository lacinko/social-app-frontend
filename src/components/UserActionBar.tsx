import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { Like } from "@/redux/api/types";
import { cn } from "@/lib/utils";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useUpdateLikeMutation,
} from "@/redux/api/likeApiSlice";

type UserActionBarProps = {
  likes: number;
  comments: number;
  myLike: Like;
  postId?: string;
  commentId?: string;
  handleComment: () => void;
};

function UserActionBar({
  likes,
  comments,
  myLike,
  postId,
  commentId,
  handleComment,
}: UserActionBarProps) {
  const isLiked = !!myLike;

  const [createLike] = useCreateLikeMutation();
  const [updateLike] = useUpdateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();

  const handleLike = async (
    event: React.MouseEvent<HTMLButtonElement>,
    isPositive: boolean
  ) => {
    try {
      event.preventDefault();
      const { name } = event.currentTarget;
      const likeState = myLike?.isPositive ? "like" : "dislike";

      if (isLiked && likeState === name) {
        return await deleteLike(myLike.id);
      }

      if (isLiked) {
        await updateLike({
          id: myLike.id,
          data: { isPositive },
        });
      } else {
        await createLike({
          postId,
          commentId,
          isPositive,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setButtonClass = () => {
    if (myLike?.isPositive) {
      return "bg-indigo-500 text-white";
    } else if (myLike?.isPositive === false) {
      return "bg-blue-500 text-white";
    } else {
      return "";
    }
  };
  const buttonCSS = setButtonClass();

  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("POST-ID", postId, "COMMENT-ID", commentId);
  };

  return (
    <div className="flex justify-between mt-4">
      <div className="flex gap-3 text-sm">
        <div
          className={cn(
            buttonCSS,
            "inline-flex items-center border rounded-full h-8"
          )}
        >
          <Button
            name="like"
            variant={"ghost"}
            className="h-8 rounded-full"
            onClick={(event) => handleLike(event, true)}
          >
            <Icons.thumbsUp className="w-4 h-4" />
          </Button>
          <span className="">{likes}</span>
          <Button
            name="dislike"
            variant={"ghost"}
            className="h-8 rounded-full"
            onClick={(event) => handleLike(event, false)}
          >
            <Icons.thumbsDown className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant={"outline"}
          className="px-4 rounded-full h-8"
          onClick={handleComment}
        >
          <Icons.comment className="w-4 h-4 mr-1" /> {comments}
        </Button>
      </div>
      <Button
        variant={"outline"}
        className="px-4 rounded-full h-8"
        onClick={(e) => handleShare(e)}
      >
        <Icons.share className="w-4 h-4 mr-1" /> Share
      </Button>
    </div>
  );
}

export default UserActionBar;
