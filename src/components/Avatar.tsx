import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

function Avatar() {
  const user = useAppSelector((state) => state.userState.user);
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
        src="/avatar-images/augustus.png"
        alt="profile-image"
      />
    </Link>
  );
}

export default Avatar;
