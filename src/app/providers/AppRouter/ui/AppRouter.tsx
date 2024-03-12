import { Route, Routes } from "react-router-dom";
import { routerConfig } from "src/app/config/routerConfig";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      {Object.values(routerConfig).map(({ path, element, isPrivate }) => {
        if (isPrivate) {
          return (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          );
        }
        return <Route key={path} path={path} element={element} />;
      })}
    </Routes>
  );
}

export default AppRouter;
