import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function PrivateRoute({ children }) {
    const [login, setIsLoggedIn] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true);
        }
    }, [isAuthenticated]);

    const handleLogin = () => {
        loginWithRedirect();
    };

    if (login) {
        return children;
    } else {
        return (
            <>
                <h2>Please Login To View Your Profile</h2>
                <div
                    onClick={() => handleLogin()}
                    className="bg-black cursor-pointer rounded px-2 text-white font-medium py-1"
                >
                    Login
                </div>
            </>
        );
    }
}

export default PrivateRoute;
