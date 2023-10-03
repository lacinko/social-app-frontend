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
};
