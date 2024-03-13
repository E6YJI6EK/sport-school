import { useAppDispatch } from "src/app/config/store";
import cls from "./Schedule.module.scss";
import { memo, useEffect, useState } from "react";
import {
  Workout,
  WorkoutsActions,
  getSchedule,
  getWorkoutsState,
} from "src/entities/Workouts";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import WeeklyScheduleTable from "./WeeklyScheduleTable";
import PaginationWidget from "src/shared/ui/PaginationWidget";

const SchedulePage = memo(() => {
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const { isFailure, isLoading, isSuccess, list, message } =
    useSelector(getWorkoutsState);

  const [totalCount, setTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(1);
  const [arr, setArr] = useState<[string, Workout[]][]>();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const groupWorkoutsByWeek = (workouts: Workout[]): Map<string, Workout[]> => {
    const groupedEvents = new Map<string, Workout[]>();

    workouts.forEach((workout) => {
      const year = workout.beginDateTime.getFullYear();
      const weekNumber = getWeekNumber(workout.beginDateTime); // Получаем номер недели для данной даты
      const key = `${year}-${weekNumber}`;

      if (!groupedEvents.has(key)) {
        groupedEvents.set(key, []);
      }

      groupedEvents.get(key)?.push(workout);
    });
    return groupedEvents;
  };

  // Функция для получения номера недели для заданной даты
  const getWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const daysSinceStartOfYear =
      (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
    const weekNumber = Math.floor(
      (daysSinceStartOfYear + startOfYear.getDay() - 1) / 7
    );
    return weekNumber;
  };

  useEffect(() => {
    if (isFailure) {
      alert(message);
    }
    dispatch(WorkoutsActions.clearResponseStatus());
  }, [isFailure, isSuccess]);

  useEffect(() => {
    appDispatch(getSchedule());
  }, []);

  const makeSchedule = () => {
    if (list && list.length > 0) {
      const a = groupWorkoutsByWeek(list);
      setTotalCount(a.size);
      setWorkouts(Array.from(a.entries())[currentCount - 1][1]);
    }
  };

  useEffect(() => {
    makeSchedule();
  }, [list]);

  useEffect(() => {
    makeSchedule();
  }, [currentCount]);

  return (
    <div>
      <Typography variant="h4">Расписание тренировок</Typography>
      <PaginationWidget
        currentPage={currentCount}
        totalPages={totalCount}
        onPageChange={(value: number) => setCurrentCount(value)}
      />
      <div>
        {isLoading ? (
          <Typography variant="h5">Загрузка</Typography>
        ) : workouts ? (
          <WeeklyScheduleTable workouts={workouts} />
        ) : null}
      </div>
    </div>
  );
});

export default SchedulePage;
