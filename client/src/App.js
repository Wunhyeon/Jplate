import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Store from "./pages/Store";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="appContainer">
      <BrowserRouter>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route path="/store" render={() => <Store />} />
          <Route path="/auth/signin" render={() => <Signin />} />
          <Route path="/auth/signup" render={() => <Signup />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
