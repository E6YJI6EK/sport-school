import { UserType } from "src/entities/User";

export enum UserFunctions {
  CREATE_DISCIPLINES = "create-disciplines",
}

export const permissions: Record<string, Array<UserType>> = {
  [UserFunctions.CREATE_DISCIPLINES]: ["admin"],
};

export const hasAccess = (
  userFunction: UserFunctions,
  currentUserType: UserType | undefined
): boolean => {
  if (!currentUserType) return false;
  return permissions[userFunction].includes(currentUserType);
};
