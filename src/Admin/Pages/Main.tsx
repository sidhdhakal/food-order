import { Navigate } from 'react-router-dom';
import AdminPage from './AdminMain';
import { useState, useEffect } from 'react';
import { getCookie } from '../../Utils/getCookie';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const jwtToken = getCookie('jwt');
        if (jwtToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false); // Set loading to false after authentication check
    }, []); // Empty dependency array ensures this runs only once on mount

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return isAuthenticated ? <AdminPage /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;