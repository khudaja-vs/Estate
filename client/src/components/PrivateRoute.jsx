import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        currentUser ? <Outlet/> : 
        //<h1>Sign in to view ths page</h1>:
        <Navigate to="/sign-in" replace />
    )
}
