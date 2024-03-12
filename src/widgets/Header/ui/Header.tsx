import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { RouterPath } from "src/app/config/routerConfig";
import RouterLink from "src/shared/ui/RouterLink";
import { useDispatch, useSelector } from "react-redux";
import { UserActions, getUserId, getUserLogin } from "src/entities/User";
import { getUserAuthorized } from "src/entities/User/model/selectors/getUserAuthorized";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const login = useSelector(getUserLogin);
  const id = useSelector(getUserId);
  const authorized = useSelector(getUserAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Место для логотипа */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to={RouterPath.main}>Sport School</RouterLink>
        </Typography>

        {/* Кнопки входа/регистрации */}
        {authorized ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: 200,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="div">
              <RouterLink to={RouterPath.userProfile} state={{ id }}>
                {login}
              </RouterLink>
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                dispatch(UserActions.logout());
                navigate(RouterPath.main);
              }}
            >
              Выйти
            </Button>
          </div>
        ) : (
          <>
            <RouterLink to={RouterPath.signIn}>
              <Button color="inherit">Вход</Button>
            </RouterLink>
            <RouterLink to={RouterPath.signUp}>
              <Button color="inherit">Регистрация</Button>
            </RouterLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
