import { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import cls from "./ProfileEditPage.module.scss";
import RouterLink from "src/shared/ui/RouterLink";
import { RouterPath } from "src/app/config/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  UserActions,
  changeContactData,
  changePassword,
  getUserId,
  getUserResponseState,
} from "src/entities/User";
import { useAppDispatch } from "src/app/config/store";
import { useNavigate } from "react-router-dom";

const ProfileEditPage = () => {
  const { isSuccess, isFailure, isLoading, message } =
    useSelector(getUserResponseState);
  const id = useSelector(getUserId);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    contactData: "",
  });
  // @ts-ignore
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // @ts-ignore
  const handlePasswordChange = (e) => {
    e.preventDefault();

    appDispatch(
      changePassword({
        oldPassword: formData.oldPassword.trim(),
        newPassword: formData.newPassword.trim(),
        id: id as string,
      })
    );
  };
  // @ts-ignore
  const handleContactDataChange = (e) => {
    e.preventDefault();
    if (!formData.contactData) {
      alert("Введите контактную информацию");
      return;
    }
    appDispatch(
      changeContactData({
        id: id as string,
        contactData: formData.contactData.trim(),
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      alert(message);
      dispatch(UserActions.clearResponseStatus());
      navigate(RouterPath.userProfile, {
        state: { id },
      });
    }
    if (isFailure) {
      alert(message);
      dispatch(UserActions.clearResponseStatus());
    }
  }, [isSuccess, isFailure]);

  return (
    <>
      {isLoading ? (
        <Typography variant="h5">Загрузка</Typography>
      ) : (
        <form className={cls.form}>
          <div>
            <Typography>Изменить пароль</Typography>
            <TextField
              type="password"
              required
              name="oldPassword"
              label="Старый пароль"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <TextField
              type="password"
              required
              name="newPassword"
              label="Новый пароль"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Button
              onClick={handlePasswordChange}
              type="submit"
              variant="contained"
              color="primary"
            >
              Сохранить
            </Button>
          </div>

          <div>
            <Typography>Изменить контактные данные</Typography>
            <TextField
              required
              name="contactData"
              label="Контактные данные"
              value={formData.contactData}
              onChange={handleChange}
            />
            <Button
              onClick={handleContactDataChange}
              type="submit"
              variant="contained"
              color="primary"
            >
              Сохранить
            </Button>
          </div>
        </form>
      )}

      <div style={{ margin: "auto", textAlign: "center" }}>
        <RouterLink to={RouterPath.userProfile} state={{ id }}>
          <Button variant="outlined">Назад</Button>
        </RouterLink>
      </div>
    </>
  );
};

export default ProfileEditPage;
