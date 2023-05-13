import { Navigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Loader } from "rsuite";

const PrivateRoute = ({ children, ...routeProps }) => {
    const { profile, loading } = useProfile();

    if(!profile && loading){
        return <Loader size="lg" center content="Loading" vertical speed="slow"/>
    }

    if(!profile && !loading){
        return <Navigate to="/signin" />
    }

    return (
        children
    );
}

export default PrivateRoute;