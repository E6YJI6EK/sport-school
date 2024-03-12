import {
  DisciplineActions,
  DisciplineReducer,
} from "./model/slice/DisciplineSlice";
import { Discipline, DisciplinesState } from "./model/types/Discipline";
import { getDisciplinesState } from "./model/selectors/getDisciplinesState";
import { createDiscipline } from "./model/services/createDiscipline";
import { getDisciplines } from "./model/services/getDisciplines";

export {
  DisciplineActions,
  DisciplineReducer,
  getDisciplinesState,
  createDiscipline,
  getDisciplines,
};
export type { Discipline, DisciplinesState };
