import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "src/app/config/routerConfig";
import { useAppDispatch } from "src/app/config/store";
import { signIn } from "src/features/SignIn/model/services/signIn";
import { SignInActions, getSignInState } from "src/features/SignIn";
import { UserActions } from "src/entities/User";
import { getToken } from "src/shared/lib/getToken";
import { getUserData } from "src/shared/lib/getUserData";

const SignInPage = memo(() => {
  const appDispatch = useAppDispatch();
  const { isLoading, isFailure, isSuccess, message } =
    useSelector(getSignInState);
  const navigate = useNavigate();
  //@ts-ignore
  const [values, setValues] = useState<SignInSchema>({});
  // @ts-ignore
  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  // @ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    appDispatch(signIn(values));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const token = getToken();
      dispatch(UserActions.initUser(token));
      const { id } = getUserData();
      dispatch(SignInActions.clear());
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
        Вход
      </Typography>
      {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
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
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
});

export default SignInPage;
