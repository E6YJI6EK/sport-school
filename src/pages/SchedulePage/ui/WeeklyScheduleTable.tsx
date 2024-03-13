import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { Workout } from "src/entities/Workouts";
import { formatDate, formatDateOnlyTime } from "src/shared/lib/formatDate";
import { getDayOfWeek } from "src/shared/lib/getDayOfWeek";
import { sortByDate } from "src/shared/lib/sortByDateTime";
interface WeeklyScheduleTableProps {
  workouts: Array<Workout>;
}

const initialWeekDays: { [key: string]: never[] | Workout[] } = {
  Понедельник: [],
  Вторник: [],
  Среда: [],
  Четверг: [],
  Пятница: [],
  Суббота: [],
};

const WeeklyScheduleTable: FC<WeeklyScheduleTableProps> = (props) => {
  const { workouts } = props;
  const [weekDays, setWeekDays] = useState(initialWeekDays);

  useEffect(() => {
    const arr = {
      Понедельник: [],
      Вторник: [],
      Среда: [],
      Четверг: [],
      Пятница: [],
      Суббота: [],
    };
    workouts
      .sort((a, b) => sortByDate(a.beginDateTime, b.beginDateTime))
      .forEach((workout) => {
        const weekDay: string = getDayOfWeek(workout.beginDateTime);
        // @ts-ignore
        arr[weekDay].push(workout);
      });
    setWeekDays(arr);
  }, [workouts]);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(weekDays).map((key) => (
              <TableCell>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(weekDays).map((weekDay) => (
            <>
              {weekDays[weekDay].map((elem) => (
                <TableRow key={weekDay}>
                  {Object.keys(weekDays).map((wday) => {
                    if (wday === weekDay) {
                      return (
                        <TableCell>
                          <p>{elem.name}</p>
                          <p>{formatDate(elem.beginDateTime.toUTCString())}</p>
                          <p>
                            {formatDateOnlyTime(
                              elem.beginDateTime.toUTCString()
                            )}{" "}
                            -{" "}
                            {formatDateOnlyTime(elem.endDateTime.toUTCString())}
                          </p>

                          <p>{elem.coach}</p>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell>
                        <p>Нет занятий</p>{" "}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default WeeklyScheduleTable;
