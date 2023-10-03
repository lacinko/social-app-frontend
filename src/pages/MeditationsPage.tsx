import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { NavLink, Outlet } from "react-router-dom";
import List from "@/components/List";
import { useGetCollectionsQuery } from "@/redux/api/collectionApiSlice";

function MeditationsPage() {
  const [showCollection, setShowCollection] = useState(true);
  const handleClick = async (isVisible: boolean) => {
    setShowCollection(isVisible);
  };
  const { isLoading, isSuccess, isError, currentData } = useGetCollectionsQuery(
    {}
  );

  let content;
  if (isLoading) content = <div>Loading...</div>;
  if (isError) content = <div>Something went wrong!</div>;
  if (isSuccess)
    content = (
      <div>
        <List
          isLink={true}
          isOrdered={false}
          list={currentData}
          className="gap-4 pt-6"
          listItemStyle="bg-indigo-200 p-2 rounded-md shadow-md hover:bg-indigo-300 cursor-pointer"
        />
      </div>
    );

  return (
    <div className="container py-3">
      <div>
        <div className="flex gap-1">
          <NavLink
            to="create-collection"
            onClick={() => handleClick(false)}
            className={buttonVariants()}
          >
            New collection
          </NavLink>
          <NavLink
            to="/meditations"
            onClick={() => handleClick(true)}
            className={buttonVariants()}
          >
            My collections
          </NavLink>
        </div>
        {showCollection && content}
        <Outlet />
      </div>
    </div>
  );
}

export default MeditationsPage;
