import React, { FC, useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getDisciplines, getDisciplinesState } from "src/entities/Disciplines";
import { getCoaches } from "src/shared/services/fetchCoaches";
import { useAppDispatch } from "src/app/config/store";

interface DisciplineListProps {
  coaches: Array<any>;
}

const DisciplineList: FC<DisciplineListProps> = (props) => {
  const { coaches } = props;

  const { list, isFailure, isSuccess, isLoading, message } =
    useSelector(getDisciplinesState);

  const appDispatch = useAppDispatch();

  const getCoachNameById = (id: string): string => {
    if (coaches.length > 0) {
        console.log(list);
        console.log(id);
      const coach = coaches.find((coach) => coach.id === id);
      if (coach) {
        return [coach.last_name, coach.name, coach.patronymic].join(" ");
      }
    }
    return "Тренер неизвестен";
  };

  useEffect(() => {
    appDispatch(getDisciplines());
  }, []);

  if (isSuccess) {
    return (
      <List>
        {list.map((discipline, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={discipline.name}
              secondary={getCoachNameById(discipline.userId)}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  if (isFailure) {
    return (
      <Typography variant="body2" color="error">
        {message}
      </Typography>
    );
  }

  if (isLoading) {
    return <Typography variant="body2">Загрузка...</Typography>;
  }

  return null;
};

export default DisciplineList;
