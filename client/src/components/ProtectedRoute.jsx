import React, { useContext } from 'react';
import { GlobalContext } from '@/contexts/GlobalContext';
import { SignIn } from '@/pages';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(GlobalContext);

    return isLoggedIn ? children : <SignIn />;
};

export default ProtectedRoute;
