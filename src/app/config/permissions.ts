import { UserType } from "src/entities/User";

export enum UserFunctions {
  CREATE_DISCIPLINES = "create-disciplines",
  CREATE_WORKOUTS = 'create-workouts',
}

export const permissions: Record<UserFunctions, Array<UserType>> = {
  [UserFunctions.CREATE_DISCIPLINES]: ["admin"],
  [UserFunctions.CREATE_WORKOUTS]: ["admin", "coach"],
};

export const hasAccess = (
  userFunction: UserFunctions,
  currentUserType: UserType | undefined
): boolean => {
  if (!currentUserType) return false;
  return permissions[userFunction].includes(currentUserType);
};
