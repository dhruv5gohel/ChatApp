import { Navigate } from "react-router";

const PrivateRoute = ({ children, ...routeProps }) => {
    const profile = false;

    if(!profile){
        return <Navigate to="/signin" />
    }

    return (
        children
    );
}

export default PrivateRoute;