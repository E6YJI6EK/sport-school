import { SignUpSchema } from "src/features/SignUp";
import { SignInSchema } from "src/features/SignIn";
import { UserState } from "src/entities/User/model/types/User";
import { DisciplinesState } from "src/entities/Disciplines";
import { WorkoutsSchema } from "src/entities/Workouts";

export interface StateSchema {
  SignUpSchema: SignUpSchema;
  SignInSchema: SignInSchema;
  UserState: UserState;
  DisciplineState: DisciplinesState;
  WorkoutsState: WorkoutsSchema;
}
