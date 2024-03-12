import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
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
      <Typography variant="h3" align="center" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Извините, запрошенная вами страница не найдена.
      </Typography>
      <Button
        style={{
          width: 200,
          margin: "0 auto 0 auto",
        }}
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        На главную
      </Button>
    </Container>
    
  );
}

export default NotFoundPage;
