import cls from "./Footer.module.scss";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <div className={cls.Footer}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; 2024 Sport School
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
