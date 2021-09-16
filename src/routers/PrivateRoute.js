import { Redirect, Route } from "react-router-dom";

const user = null;
//const user = { id: 1, name: "Pedro", rol: "admin" };

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>{user ? <Component /> : <Redirect to="/login" />}</Route>
  );
};
/*
const PrivateRoute = (props) => {
  return <Route {...props} />;
};
*/
/*
const PrivateRoute = ({ exact, path, component }) => {
  return <Route exact={exact} path={path} component={component} />;
};
*/
/*
const PrivateRoute = (props) => {
  return (
    <Route exact={props.exact} path={props.path} component={props.component} />
  );
};
*/
export default PrivateRoute;
