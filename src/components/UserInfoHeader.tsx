import { cn, getTimeDiffrenceFromDate } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { useState, useEffect } from "react";
import FlyoutMenu from "./FlyoutMenu";
import { useDeleteCommentMutation } from "@/redux/api/commentApiSlice";
import { useDeletePostMutation } from "@/redux/api/postApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";
import { Collection } from "@/redux/api/types";

type UserInfoHeaderProps = {
  id: string;
  editItemName: string;
  author: {
    name: string;
    photo: string;
  };
  createdAt: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  collection: Collection;
};

function UserInfoHeader({
  id,
  editItemName,
  author,
  createdAt,
  setIsEdit,
  collection,
}: UserInfoHeaderProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [openOptions, setOpenOptions] = useState(false);
  const userPhoto =
    author && !author.photo ? (
      author.photo
    ) : (
      <Icons.user className="w-6 h-6 " />
    );

  const collectionPhoto = (
    <img
      src="https://clipart-library.com/newhp/52-524263_old-library-building-svg-png-icon-free-download.png"
      alt="collection image"
      className="w-10 h-10 rounded-full border-2 border-black shadow-lg"
    />
  );

  const [deleteComment] = useDeleteCommentMutation();
  const [deletePost, { isSuccess }] = useDeletePostMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleOnClickDelete = () => {
    if (editItemName === "Comment") {
      deleteComment(id);
    }
    if (editItemName === "Post") {
      deletePost(id);
    }
  };

  const handleOnClickEdit = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Post deleted",
        description: "You post has been deleted successfully",
      });
      navigate(from);
    }
  }, [isSuccess]);

  let headerContent;
  if (collection) {
    headerContent = (
      <>
        {collectionPhoto}
        <p className="inline-flex leading-tight flex-col italic">
          <div className="text-gray-900 font-bold">{collection.name}</div>
          <div className="text-gray-600 font-semibold">
            By {author && author.name}
          </div>
        </p>
      </>
    );
  } else {
    headerContent = (
      <>
        {userPhoto}
        <p className="inline-flex flex-col text-gray-600 font-semibold italic">
          {author && author.name}
        </p>
      </>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div
        className={cn(
          collection ? " items-start" : "items-center",
          "flex gap-2 text-sm"
        )}
      >
        {headerContent}
        <div
          className={cn(
            collection && "mt-2",
            "h-1 w-1 rounded-full bg-gray-400"
          )}
        ></div>
        <p className="text-gray-600">{getTimeDiffrenceFromDate(createdAt)}</p>
      </div>
      <Button
        variant={"ghost"}
        className="h-6 text-lg font-bold"
        onClick={(e) => {
          setCoords(() => ({
            x: editItemName === "Post" ? e.clientX - 120 : e.clientX - 160,
            y: e.clientY + 10,
          }));
          setOpenOptions(true);
        }}
      >
        …
      </Button>
      {openOptions && (
        <FlyoutMenu setShowFlyoutMenu={setOpenOptions} coords={coords}>
          <div
            className="group cursor-pointer relative flex items-center gap-x-2 rounded-lg p-1 hover:bg-gray-50"
            onClick={handleOnClickEdit}
          >
            <div className="p-1 rounded-lg bg-gray-50 group-hover:bg-white">
              <Icons.addPost className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Edit {editItemName}
                <span className="absolute inset-0"></span>
              </p>
            </div>
          </div>
          <div
            className="group cursor-pointer relative flex items-center gap-x-2 rounded-lg p-1 hover:bg-gray-50"
            onClick={handleOnClickDelete}
          >
            <div className="p-1 rounded-lg bg-gray-50 group-hover:bg-white">
              <Icons.trash className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Delete {editItemName}
                <span className="absolute inset-0"></span>
              </p>
            </div>
          </div>
        </FlyoutMenu>
      )}
    </div>
  );
}

export default UserInfoHeader;
