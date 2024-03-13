import { RouteProps } from "react-router-dom";
import DisciplinesPage from "src/pages/DisciplinesPage";
import MainPage from "src/pages/MainPage";
import NotFoundPage from "src/pages/NotFoundPage";
import ProfileEditPage from "src/pages/ProfileEditPage";
import SchedulePage from "src/pages/SchedulePage";
import SignInPage from "src/pages/SignInPage";
import SignUpPage from "src/pages/SignUpPage";
import UserProfilePage from "src/pages/UserPage";
import WorkoutCreationPage from "src/pages/WorkoutCreationPage";

export enum Routes {
  MAIN = "main",
  SIGN_UP = "signUp",
  SIGN_IN = "signIn",
  USER_PROFILE = "userProfile",
  EDIT_PROFILE = "editProfile",
  DISCIPLINES = "disciplines",
  SCHEDULE = "schedule",
  WORKOUT_CREATION = "workoutCreation",
  PAGE404 = "notFound",
}

export const RouterPath: Record<Routes, string> = {
  [Routes.MAIN]: "/",
  [Routes.SIGN_UP]: "/sign-up",
  [Routes.SIGN_IN]: "/sign-in",
  [Routes.USER_PROFILE]: "/user",
  [Routes.EDIT_PROFILE]: "/edit-profile",
  [Routes.DISCIPLINES]: "/disciplines",
  [Routes.SCHEDULE]: "/schedule",
  [Routes.WORKOUT_CREATION]: "/workout-creation",
  [Routes.PAGE404]: "/*",
};

type Route = RouteProps & { isPrivate?: boolean };

export const routerConfig: Record<Routes, Route> = {
  [Routes.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [Routes.SIGN_UP]: {
    path: RouterPath.signUp,
    element: <SignUpPage />,
  },
  [Routes.SIGN_IN]: {
    path: RouterPath.signIn,
    element: <SignInPage />,
  },
  [Routes.USER_PROFILE]: {
    path: RouterPath.userProfile,
    element: <UserProfilePage />,
    isPrivate: true,
  },
  [Routes.EDIT_PROFILE]: {
    path: RouterPath.editProfile,
    element: <ProfileEditPage />,
    isPrivate: true,
  },
  [Routes.DISCIPLINES]: {
    path: RouterPath.disciplines,
    element: <DisciplinesPage />,
    isPrivate: true,
  },
  [Routes.SCHEDULE]: {
    path: RouterPath.schedule,
    element: <SchedulePage />,
  },
  [Routes.WORKOUT_CREATION]: {
    path: RouterPath.workoutCreation,
    element: <WorkoutCreationPage />,
  },
  [Routes.PAGE404]: {
    path: RouterPath.notFound,
    element: <NotFoundPage />,
  },
};
