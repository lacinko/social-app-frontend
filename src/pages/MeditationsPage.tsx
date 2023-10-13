import { useState } from "react";
import { Outlet } from "react-router-dom";
import List from "@/components/List";
import {
  useGetCollectionsAccountsQuery,
  useGetCollectionsQuery,
} from "@/redux/api/collectionApiSlice";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { convertUrlParamsIntoURLString } from "@/lib/utils";

function MeditationsPage() {
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  const userCollectionsQueryParams = {
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  };

  const userCollectionsQueryString = convertUrlParamsIntoURLString(
    userCollectionsQueryParams
  );

  const { isLoading, isSuccess, isError, currentData } = useGetCollectionsQuery(
    userCollectionsQueryString
  );

  const collectionsAccountsQueryParams = {
    where: {
      userId: user?.id,
    },
  };

  const collectionsAccountsQueryString = convertUrlParamsIntoURLString(
    collectionsAccountsQueryParams
  );
  const { data: userCollections } = useGetCollectionsAccountsQuery(
    collectionsAccountsQueryString
  );

  console.log(userCollections);

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
          listItemStyle="p-2 rounded-md shadow-md hover:bg-gray-200 cursor-pointer"
        />
      </div>
    );

  return (
    <div className="container py-4">
      <div>
        <h1 className="font-semibold text-lg py-2 text-gray-900">
          My Collections
        </h1>
        {content}
        <Outlet />
      </div>
    </div>
  );
}

export default MeditationsPage;
