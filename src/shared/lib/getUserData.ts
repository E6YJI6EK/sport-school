import { USER_DATA_KEY } from "src/app/consts/consts";

export const getUserData = () => {
  const user = localStorage.getItem(USER_DATA_KEY);
  return user ? JSON.parse(user) : null;
};
