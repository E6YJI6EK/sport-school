import { FC, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useAppDispatch } from "src/app/config/store";
import { createDiscipline, getDisciplines } from "src/entities/Disciplines";
import cls from "./DisciplinesPage.module.scss";

interface AddDisciplineFormProps {
  coaches: Array<any>;
}

const AddDisciplineForm: FC<AddDisciplineFormProps> = (props) => {
  const { coaches } = props;
  const [values, setValues] = useState({
    name: "",
    userId: "",
  });

  const appDispatch = useAppDispatch();
  // @ts-ignore
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  // @ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    appDispatch(createDiscipline(values));
    appDispatch(getDisciplines());
  };

  return (
    <form className={cls.form} onSubmit={onSubmit}>
      <TextField
        label="Название дисциплины"
        name="name"
        value={values.name}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Тренер</InputLabel>
        <Select name="userId" value={values.userId} onChange={onChange}>
          {coaches.map((coach) => (
            // @ts-ignore
            <MenuItem key={coach.id} value={coach.id}>
              {
                // @ts-ignore
                coach.last_name
              }{" "}
              {
                // @ts-ignore
                coach.name
              }{" "}
              {
                // @ts-ignore
                coach.patronymic
              }
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Добавить дисциплину
      </Button>
    </form>
  );
};

export default AddDisciplineForm;
