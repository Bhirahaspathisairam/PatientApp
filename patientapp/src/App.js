import "./App.css";

import UserLogin from "./userLogin/userlogin";
import Signup from "./signUp/signup";
import Header from "./Header/header";
import Page1 from "./pages/page1";
import { Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Page2 from "./pages/page2";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={UserLogin} />
          <Route path="/signup" component={Signup} />
          <Route path="/page1" component={Page1} />
          <Route path="/page2" component={Page2} />
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;
