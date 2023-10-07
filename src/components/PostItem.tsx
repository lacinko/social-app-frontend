import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import UserInfoHeader from "./UserInfoHeader";
import UserActionBar from "./UserActionBar";
import { Like, Comment, Collection } from "@/redux/api/types";
import { Button } from "./ui/Button";
import { TypeOf, object, string } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePostMutation } from "@/redux/api/postApiSlice";

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
  handleCommentFocus?: () => void;
  likes: Like[];
  comments: Comment[];
  myLike: Like;
  collection: Collection;
};

function PostItem({
  id,
  title,
  content,
  createdAt,
  author,
  isDetail,
  handleCommentFocus,
  likes,
  comments,
  myLike,
  collection,
}: PostItem) {
  const [isEdit, setIsEdit] = useState(false);
  const likesTotal = (likes as Like[]).filter((like) => like.isPositive).length;

  const dislikesTotal = (likes as Like[]).filter(
    (like) => !like.isPositive
  ).length;

  const commentsTotal = (comments as Comment[]).length;

  const [updatePost] = useUpdatePostMutation();

  const updatePostSchema = object({
    content: string().min(1, "Content is required"),
  });

  type TUpdatePost = TypeOf<typeof updatePostSchema>;

  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: errors,
    setValue,
  } = useForm<TUpdatePost>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      content,
    },
  });

  useEffect(() => {
    register("content");
  }, [register]);

  const onEditorStateChange = (editorState: string) => {
    setValue("content", editorState);
  };

  const editorContent = watch("content");

  const onSubmitHandler: SubmitHandler<TUpdatePost> = async (
    values: TUpdatePost
  ) => {
    try {
      await updatePost({ id, values });
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const innerHTML = (
    <>
      <div className="border-2 mb-1 shadow-sm container py-4">
        <UserInfoHeader
          collection={collection && collection}
          author={author}
          createdAt={createdAt}
          id={id}
          editItemName="Post"
          setIsEdit={setIsEdit}
        />
        <p className="text-xl font-semibold pt-4">{title}</p>
        {isDetail && (
          <form
            className={isEdit ? "mt-4" : ""}
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <ReactQuill
              theme="snow"
              value={isEdit ? editorContent : content}
              onChange={onEditorStateChange}
              readOnly={!isEdit}
              className={isEdit ? "" : "editor"}
            />
            {isEdit && (
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button>{isEdit ? "Update" : "Send"}</Button>
              </div>
            )}
          </form>
        )}
        <UserActionBar
          likes={likesTotal - dislikesTotal}
          myLike={myLike}
          comments={commentsTotal}
          postId={id}
          handleComment={handleCommentFocus!}
        />
      </div>
    </>
  );

  if (isDetail) return innerHTML;

  return <Link to={`/post/${id}`}>{innerHTML}</Link>;
}

export default PostItem;
