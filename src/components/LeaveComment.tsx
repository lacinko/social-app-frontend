import { useEffect } from "react";
import { TypeOf, object, string } from "zod";
import { Icons } from "./Icons";
import L_Input from "@/components/Input";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCommentMutation } from "@/redux/api/commentApiSlice";
import { toast } from "./ui/use-toast";
import { useGetMeQuery } from "@/redux/api/userApiSlice";

type LeaveCommentProps = {
  postId: string;
  parentId: string;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

function LeaveComment({
  postId,
  parentId,
  isFocused,
  setIsFocused,
}: LeaveCommentProps) {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  const [createComment, { isError, isLoading, isSuccess, error }] =
    useCreateCommentMutation();

  const userPhoto =
    user && !user.photo ? user.photo : <Icons.user className="w-8 h-8" />;

  const commentSchema = object({
    postId: string(),
    parentId: string().optional(),
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
      console.log(values);
      await createComment(values);
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
    toast({
      title: "Error!",
      description: "Somthing went wrong",
    });
  }, [isError, isSuccess]);

  useEffect(() => {
    if (isFocused) {
      setFocus("content");
    }
  }, [isFocused, setFocus]);

  return (
    <div className="container py-4">
      <div className="flex gap-2 items-center">
        {userPhoto}
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          <L_Input
            id="content"
            placeholder="Leave a comment"
            register={register}
            className="focus-visible:ring-indigo-600 rounded-3xl"
            onKeyDown={handleKeyDown}
            onBlur={() => setIsFocused(false)}
          />
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
