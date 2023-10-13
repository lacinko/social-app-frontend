import { convertUrlParamsIntoURLString } from "@/lib/utils";
import { useGetPostsQuery } from "@/redux/api/postApiSlice";
import { Like, Post } from "@/redux/api/types";
import { useGetMeQuery } from "@/redux/api/userApiSlice";
import { useCallback, useState } from "react";

type useFilterReturnProps = {
  filteredPosts: Post[];
  selectedFilterOption: string;
  searchTerm: string;
  feed: string;
  setSelectedFilterOption: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFeed: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
  isFetching: boolean;
};

type postsQueryParamsProps = {
  where?: {
    [key: string]: any;
  };
  include: {
    collection: boolean;
    comments: boolean;
    likes: boolean;
    author: {
      select: {
        name: boolean;
        photo: boolean;
      };
    };
  };
};

export const useFilter = (): useFilterReturnProps => {
  //https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
  const [selectedFilterOption, setSelectedFilterOption] = useState("New");
  const [searchTerm, setSearchTerm] = useState("");
  const [feed, setFeed] = useState("Discover");
  const { user } = useGetMeQuery(null, {
    selectFromResult: ({ data }) => ({ user: data || null }),
  });

  // Define an object to represent the parameters
  const postsQueryParams: postsQueryParamsProps = {
    include: {
      collection: true,
      comments: true,
      likes: true,
      author: {
        select: {
          name: true,
          photo: true,
        },
      },
    },
  };

  if (feed === "My Collections") {
    postsQueryParams.where = {
      collection: {
        members: {
          some: {
            userId: user?.id,
          },
        },
      },
    };
  }

  if (feed === "My Posts") {
    postsQueryParams.where = {
      authorId: user?.id,
    };
  }

  // Convert the object to a URL-encoded query string
  const postsQueryString = convertUrlParamsIntoURLString(postsQueryParams);

  const {
    data: posts,
    isError,
    isFetching,
  } = useGetPostsQuery(postsQueryString);

  const filterPosts = useCallback((): Post[] => {
    const giveScore = (votes: Like[]) => {
      const likes = votes.filter((vote) => vote.isPositive).length;
      const dislikes = votes.filter((vote) => !vote.isPositive).length;
      return likes - dislikes;
    };

    const giveHotScore = (votes: Like[], date: string) => {
      const score = giveScore(votes);
      const order = Math.log(Math.max(Math.abs(score), 1));
      const sign = score > 0 ? 1 : score < 0 ? -1 : 0;
      const seconds =
        convertDateStringToMilliseconds(date) -
        import.meta.env.VITE_SITE_LIVE_DATE_MS;

      return Math.round(sign * order + seconds / 45000);
    };

    const convertDateStringToMilliseconds = (dateSting: string) => {
      return +new Date(dateSting);
    };

    if (selectedFilterOption === "New") {
      return [...posts!].sort(
        (a, b) =>
          convertDateStringToMilliseconds(b.createdAt) -
          convertDateStringToMilliseconds(a.createdAt)
      );
    }

    if (selectedFilterOption === "Top") {
      return [...posts!].sort((a, b) => {
        const postAInteractions = a.likes.length + a.comments.length;
        const postBInteractions = b.likes.length + b.comments.length;

        if (postAInteractions >= postBInteractions) return -1;
        return 1;
      });
    }

    if (selectedFilterOption === "Best") {
      return [...posts!].sort((a, b) => {
        const postAScore = giveScore(a.likes);
        const postBScore = giveScore(b.likes);

        if (postAScore >= postBScore) return -1;
        return 1;
      });
    }

    if (selectedFilterOption === "Hot") {
      return [...posts!].sort((a, b) => {
        const postAHotScore = giveHotScore(a.likes, a.createdAt);
        const postBHotScore = giveHotScore(b.likes, b.createdAt);

        if (postAHotScore >= postBHotScore) return -1;
        return 1;
      });
    }

    return posts!;
  }, [posts, selectedFilterOption]);

  const filteredPosts = !isFetching || isError ? filterPosts() : [];
  const searchedPosts = filteredPosts?.filter(
    (post) =>
      post.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      post.content
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      post.collection.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      post.author.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
  );

  return {
    isFetching,
    isError,
    filteredPosts: searchedPosts,
    selectedFilterOption,
    searchTerm,
    feed,
    setSelectedFilterOption,
    setSearchTerm,
    setFeed,
  };
};
