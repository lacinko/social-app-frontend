import { userApi } from "@/redux/api/userApiSlice";

export function userLoader() {
  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => ({
      ...data,
    }),
  });
  console.log(user);
  return { test: user };
}
