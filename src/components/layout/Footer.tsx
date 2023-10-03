import { Link } from "react-router-dom";
import { Icons } from "../Icons";

function Footer() {
  return (
    <div className="container mx-auto max-w-screen-xl py-3 bg-indigo-600 text-white flex justify-between items-center z-30">
      <p className="text-xs">All rights reserved</p>
      <div className="flex gap-2 items-center">
        <Link to="#">
          <Icons.twitter className="h-4 w-4" />
        </Link>
        <Link to="#">
          <Icons.facebook className="h-4 w-4" />
        </Link>
        <Link to="#">
          <Icons.instagram className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
