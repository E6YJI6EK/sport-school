import { FC, useEffect, useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { RouterPath } from "src/app/config/routerConfig";
import RouterLink from "src/shared/ui/RouterLink";
import { getUser } from "src/shared/services/getUser";
import { getUserData } from "src/shared/lib/getUserData";
import {
  User,
  UserActions,
  UserType,
  getAchievements,
  getUserResponseState,
  getUserState,
} from "src/entities/User";
import { useLocation, useParams } from "react-router-dom";
import { getUserType } from "src/shared/lib/getUserType";
import { useAppDispatch } from "src/app/config/store";
import { useDispatch, useSelector } from "react-redux";
interface UserProfilePageProps {}

const UserProfilePage: FC<UserProfilePageProps> = () => {
  const location = useLocation();
  const { isSuccess, isFailure, achievements, isLoading, message } =
    useSelector(getUserResponseState);
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<User>();
  const { id } = getUserData();
  const fetchUser = async () => {
    const data = await getUser(location.state?.id as string);
    const user = new User({
      id: data.id,
      name: data.name,
      lastName: data.last_name,
      patronymic: data.patronymic,
      birthdayDate: data.birthday_date,
      userType: data.user_type,
      gender: data.gender,
      contactData: data.contact_data,
      login: data.login,
      authorized: true,
    });
    setUserData(user);
  };

  useEffect(() => {
    if (isFailure) {
      alert(message);
    }
    dispatch(UserActions.clearResponseStatus());
  }, [isFailure, isSuccess]);

  useEffect(() => {
    fetchUser();
    appDispatch(getAchievements());
  }, []);

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{ padding: 2, marginTop: 4 }}
        style={{
          display: "flex",
        }}
      >
        {userData ? (
          <div>
            <Typography variant="h4" gutterBottom>
              Ваш профиль
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Имя:</strong> {userData.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Фамилия:</strong> {userData.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Отчество:</strong> {userData.patronymic}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Дата рождения:</strong> {userData.birthdayDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Тип пользователя:</strong>{" "}
              {getUserType(userData.userType as UserType)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Пол:</strong> {userData.gender}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Контактные данные:</strong> {userData.contactData}
            </Typography>
          </div>
        ) : (
          <Typography variant="h3" gutterBottom>
            Загрузка
          </Typography>
        )}

        {!isLoading ? (
          <div>
            <Typography variant="h4">Ваши достижения</Typography>
            {achievements.map((achievement) => (
              <Typography variant="body1" gutterBottom>
                <strong>{achievement.date}</strong>{" "}
                <i>{achievement.description}</i>
              </Typography>
            ))}
          </div>
        ) : (
          <Typography variant="h3" gutterBottom>
            Загрузка
          </Typography>
        )}
      </Paper>
      {location.state?.id == id && (
        <RouterLink
          to={RouterPath.editProfile}
          style={{
            margin: "auto",
          }}
        >
          <Button variant="outlined">Изменить данные</Button>
        </RouterLink>
      )}
    </Container>
  );
};

export default UserProfilePage;
