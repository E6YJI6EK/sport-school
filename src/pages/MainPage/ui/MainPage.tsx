import { memo, useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import Layout from "src/widgets/Layout";
import cls from "./MainPage.module.scss";
import RouterLink from "src/shared/ui/RouterLink";
import { RouterPath } from "src/app/config/routerConfig";
import { useSelector } from "react-redux";
import { getUserId, getUserName, getUserType } from "src/entities/User";
import { getUserAuthorized } from "src/entities/User/model/selectors/getUserAuthorized";
import { Link } from "react-router-dom";
import { UserFunctions, hasAccess } from "src/app/config/permissions";

const MainPage = memo(() => {
  const userName: string = useSelector(getUserName);
  const id = useSelector(getUserId);
  const userType = useSelector(getUserType);
  const authorized = useSelector(getUserAuthorized);

  return (
    <Container
      style={{
        height: "calc(100vh - 130px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {authorized ? (
        <>
          <Typography variant="h3" align="center" gutterBottom>
            Добро пожаловать, {userName}!
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Здесь вы найдете лучшие тренеры и условия для развития ваших
            спортивных навыков.
          </Typography>
          <div className={cls.buttonHolder}>
            <RouterLink to={RouterPath.userProfile} state={{ id }}>
              <Button
                className={cls.btn}
                variant="outlined"
                color="primary"
                size="large"
              >
                Профиль
              </Button>
            </RouterLink>
            {hasAccess(UserFunctions.CREATE_DISCIPLINES, userType) && (
              <RouterLink to={RouterPath.disciplines}>
                <Button
                  className={cls.btn}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Дисциплины
                </Button>
              </RouterLink>
            )}
          </div>
        </>
      ) : (
        <>
          <Typography variant="h3" align="center" gutterBottom>
            Добро пожаловать в спортивную школу!
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Здесь вы найдете лучшие тренеры и условия для развития ваших
            спортивных навыков.
          </Typography>
          <div className={cls.buttonHolder}>
            <RouterLink to={RouterPath.signUp}>
              <Button
                className={cls.btn}
                variant="outlined"
                color="primary"
                size="large"
              >
                Зарегистрироваться
              </Button>
            </RouterLink>
          </div>
        </>
      )}
    </Container>
  );
});

export default MainPage;
