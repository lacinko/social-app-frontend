export interface IUser {
  name: string;
  email: string;
  photo: string;
  role: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export type Like = {
  id: string;
  isPositive: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  commentId: string | null;
  postId: string | null;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  author: {
    name: string;
    photo: string;
  };
  likes: Like[];
  children: Comment[];
};

export type Collection = {
  id: string;
  name: string;
  nsfw: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: "PUBLIC" | "RESTRICTED" | "PRIVATE";
};

export type Post = {
  id: string;
  title: string;
  content: string;
  image: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  collectionId: string;
  likes: Like[];
  author: {
    name: string;
    photo: string;
  };
  comments: Comment[];
  collection: Collection;
};

export type CollectionAccount = {
  id: string;
  role: "ADMIN" | "MEMBER";
  userId: string;
  collectionId: string;
};

export type CollectionAccounts = {
  [key: string]: "ADMIN" | "MEMBER";
};
