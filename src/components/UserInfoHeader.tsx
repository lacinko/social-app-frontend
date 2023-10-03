import { getTimeDiffrenceFromDate } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";

type UserInfoHeaderProps = {
  author: {
    name: string;
    photo: string;
  };
  createdAt: string;
};

function UserInfoHeader({ author, createdAt }: UserInfoHeaderProps) {
  const userPhoto =
    author && !author.photo ? (
      author.photo
    ) : (
      <Icons.user className="w-6 h-6 " />
    );

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1 text-sm">
        {userPhoto}
        <p className="text-gray-600 font-semibold italic">
          {author && author.name}
        </p>
        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
        <p className="text-gray-600">{getTimeDiffrenceFromDate(createdAt)}</p>
      </div>
      <Button variant={"ghost"} className="h-6 text-lg font-bold">
        …
      </Button>
    </div>
  );
}

export default UserInfoHeader;
