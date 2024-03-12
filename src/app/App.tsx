import "./App.scss";
import { Header } from "src/widgets/Header";
import { Footer } from "src/widgets/Footer";
import AppRouter from "./providers/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserActions } from "src/entities/User";
import { getToken } from "src/shared/lib/getToken";

function App() {
  const dispatch = useDispatch();

  const token = getToken();
  dispatch(UserActions.initUser(token));

  return (
    <Router>
      <div className="App">
        <Header />
        <AppRouter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
