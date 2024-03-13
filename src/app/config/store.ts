import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { ThunkMiddleware } from "redux-thunk";
import { useDispatch } from "react-redux";
import { SignUpReducer } from "src/features/SignUp";
import { SignInReducer } from "src/features/SignIn";
import { Tuple } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { UserReducer } from "src/entities/User";
import { DisciplineReducer } from "src/entities/Disciplines";
import { WorkoutsReducer } from "src/entities/Workouts";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    SignUpSchema: SignUpReducer,
    SignInSchema: SignInReducer,
    UserState: UserReducer,
    DisciplineState: DisciplineReducer,
    WorkoutsState: WorkoutsReducer,
  };
  return configureStore<StateSchema>({
    reducer: rootReducers,
    // @ts-ignore
    middleware: () => new Tuple(thunk),
    preloadedState: initialState,
  });
}

export const store = createReduxStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
