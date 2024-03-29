import { IUser } from "@/redux/api/types";
import { Link } from "react-router-dom";

type AvatarProps = {
  user: IUser | null;
};

function Avatar({ user }: AvatarProps) {
  const userPhotoURL = `${
    import.meta.env.VITE_SERVER_ENDPOINT
  }/images/profile/${user?.photo}`;

  if (!user)
    return (
      <Link
        className="inline-flex flex-col gap-1 font-semibold text-xs border-white border-2 rounded-md p-1 h-8 lg:hidden"
        to="/login"
      >
        Log In
      </Link>
    );

  return (
    <Link to="/profile">
      <img
        className="w-8 h-8 border-white border-2 rounded-full"
        src={userPhotoURL}
        alt="profile-image"
      />
    </Link>
  );
}

export default Avatar;
