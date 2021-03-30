import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";

const AppRouter = () => {
  return (
    <div className="appContainer">
      <Header></Header>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            <Main />;
          }}
          component={Main}
        ></Route>
      </Switch>
    </div>
  );
};

export default AppRouter;
