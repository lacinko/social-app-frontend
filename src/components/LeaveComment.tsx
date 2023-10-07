import { useEffect } from "react";
import { TypeOf, nullable, object, string, union } from "zod";
import { Icons } from "./Icons";
import L_Input from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/api/commentApiSlice";
import { toast } from "./ui/use-toast";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { Button } from "./ui/Button";

type LeaveCommentProps = {
  postId: string;
  parentId: string | null;
  isFocused: boolean;
  isEdit: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMore?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentToReply?: React.Dispatch<React.SetStateAction<boolean>>;
};

function LeaveComment({
  postId,
  parentId,
  isFocused,
  isEdit,
  setIsFocused,
  setShowMore,
  setIsEdit,
  setCommentToReply,
}: LeaveCommentProps) {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  const [createComment, { isError, isLoading, isSuccess, error }] =
    useCreateCommentMutation();

  const [updateComment] = useUpdateCommentMutation();

  const userPhoto =
    user && !user.photo ? user.photo : <Icons.user className="w-8 h-8" />;

  const commentSchema = object({
    postId: string(),
    parentId: string().nullable(),
    content: string({
      required_error: "The comment is required",
    }),
  });

  type TComment = TypeOf<typeof commentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<TComment>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId,
      parentId,
      content: "",
    },
  });

  const onSubmitHandler: SubmitHandler<TComment> = async (values: TComment) => {
    try {
      if (isEdit) {
        await updateComment({ id: parentId, content: values.content });
      } else {
        await createComment(values);
        parentId && setShowMore(true);
      }
      parentId && setCommentToReply(false);
      setIsEdit(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmitHandler);
    }
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error!",
        description: "Somthing went wrong",
      });
    }

    if (isSuccess) {
      reset();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (isFocused) {
      setFocus("content");
    }
  }, [isFocused, setFocus]);

  return (
    <div className="container py-4">
      <div className="flex gap-2 items-start">
        <div className="pt-1">{userPhoto}</div>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          <L_Input
            id="content"
            placeholder="Leave a comment"
            register={register}
            className="focus-visible:ring-indigo-600 rounded-3xl"
            onKeyDown={handleKeyDown}
            //onBlur={() => setIsFocused(false)}
            onFocusCapture={() => setIsFocused(true)}
          />
          {isFocused && (
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                onClick={() => {
                  setIsFocused(false);
                  setIsEdit(false);
                  parentId && setCommentToReply(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button>{isEdit ? "Update" : "Send"}</Button>
            </div>
          )}
        </form>
      </div>
      {isError && (
        <p role="alert" className="text-sm font-medium text-destructive mt-4">
          {error?.data?.message}
        </p>
      )}
    </div>
  );
}

export default LeaveComment;
