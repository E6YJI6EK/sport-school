import React, { memo, useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useAppDispatch } from "src/app/config/store";
import {
  WorkoutsActions,
  createWorkout,
  getWorkoutsState,
} from "src/entities/Workouts";
import { getDisciplines, getDisciplinesState } from "src/entities/Disciplines";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "src/app/config/routerConfig";

const WorkoutCreationPage = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector(getDisciplinesState);
  const { isSuccess, isFailure, message } = useSelector(getWorkoutsState);
  // State для значений полей формы
  const [formValues, setFormValues] = useState({
    beginDatetime: "",
    endDatetime: "",
    disciplineId: "",
  });

  const appDispatch = useAppDispatch();

  // Функция для обработки изменений в полях формы
  const onChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Функция для отправки данных формы
  const onSubmit = (event: any) => {
    event.preventDefault();
    appDispatch(createWorkout(formValues));
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Тренировка успешно добавлена");
      dispatch(WorkoutsActions.clearResponseStatus());
      navigate(RouterPath.schedule);
    }
    if (isFailure) {
      alert(message);
      dispatch(WorkoutsActions.clearResponseStatus());
    }
  }, [isFailure, isSuccess]);

  useEffect(() => {
    appDispatch(getDisciplines());
    dispatch(WorkoutsActions.clearResponseStatus());
  }, []);

  return (
    <div>
      <Typography variant="h4">Создание тренировки</Typography>
      <form
        onSubmit={onSubmit}
        style={{
          width: "40%",
          marginLeft: 20,
        }}
      >
        <TextField
          name="beginDatetime"
          label="Начальная дата и время"
          type="datetime-local"
          value={formValues.beginDatetime}
          onChange={onChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="endDatetime"
          label="Конечная дата и время"
          type="datetime-local"
          value={formValues.endDatetime}
          onChange={onChange}
          required
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Дисциплина</InputLabel>
          <Select
            name="disciplineId"
            value={formValues.disciplineId}
            onChange={onChange}
            required
          >
            {list.map((el) => (
              // @ts-ignore
              <MenuItem key={el.id} value={el.id}>
                {
                  // @ts-ignore
                  el.name
                }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Создать тренировку
        </Button>
      </form>
    </div>
  );
});

export default WorkoutCreationPage;
