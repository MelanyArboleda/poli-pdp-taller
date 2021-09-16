import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PlayPage from "../pages/PlayPage";
import { Fragment } from "react";

const AppRouter = () => {
  return (
    <Router>
        <Fragment>
        <header>
                <div className="flex flex-grow items-center">
                    <div >
                       <Navbar />
                   </div>
                </div>
      
      </header>
      </Fragment>
      <Switch>
        <Route  path="/about" component={AboutPage} />
        <Route  path="/play" component={PlayPage} />
        <Route  path="/" component={HomePage} />
        <Route  path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
