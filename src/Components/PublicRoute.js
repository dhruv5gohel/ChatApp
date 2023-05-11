import { Navigate } from "react-router";

const PublicRoute = ({ children, ...restProps}) => {
    const profile = true;

    if(profile){
        return <Navigate to="/" />
    }

    return (
        children
    );
}

export default PublicRoute;