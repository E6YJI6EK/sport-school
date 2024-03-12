import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect, memo } from "react";
import { useAppDispatch } from "src/app/config/store";
import { signUp } from "src/features/SignUp/model/services/signUp";
import { SignUpActions, SignUpSchema } from "src/features/SignUp";
import { getSignUpState } from "src/features/SignUp/model/selectors/getSignUpState";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "src/app/config/routerConfig";
import { getToken } from "src/shared/lib/getToken";
import { UserActions } from "src/entities/User";
import { getUserData } from "src/shared/lib/getUserData";
const SignUpPage = memo(() => {
  const appDispatch = useAppDispatch();
  const { isLoading, isFailure, isSuccess, message } =
    useSelector(getSignUpState);
  const navigate = useNavigate();
  //@ts-ignore
  const [values, setValues] = useState<SignUpSchema>({});
  // @ts-ignore
  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  // @ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    appDispatch(signUp(values));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      const token = getToken();
      dispatch(UserActions.initUser(token));
      const { id } = getUserData();
      dispatch(SignUpActions.clear());
      navigate(RouterPath.userProfile, {
        state: { id },
      });
    }
    if (isFailure) {
      alert(message);
    }
  }, [isSuccess, isFailure]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Регистрация
      </Typography>
      {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Имя"
                name="name"
                required
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Фамилия"
                name="lastName"
                required
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Отчество"
                name="patronymic"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Дата рождения"
                name="birthdayDate"
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Тип пользователя</InputLabel>
                <Select onChange={onChange} name="userType">
                  <MenuItem value="sportsman">Спортсмен</MenuItem>
                  <MenuItem value="coach">Тренер</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Пол</InputLabel>
                <Select onChange={onChange} name="gender">
                  <MenuItem value="male">Мужской</MenuItem>
                  <MenuItem value="female">Женский</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                fullWidth
                label="Контактная информация"
                name="contactData"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                fullWidth
                label="Логин"
                name="login"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                fullWidth
                type="password"
                label="Пароль"
                name="password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Зарегистрироваться
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
});

export default SignUpPage;
