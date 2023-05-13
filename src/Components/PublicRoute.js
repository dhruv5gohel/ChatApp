import { Navigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Loader } from "rsuite"

const PublicRoute = ({ children, ...restProps}) => {
    const { profile, loading } = useProfile();

    if(loading && !profile){
        <Loader center size="lg" content="Loading"/>
    }

    if(profile && !loading){
        return <Navigate to="/" />
    }

    return (
        children
    );
}

export default PublicRoute;