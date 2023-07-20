import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();

    const value = {
        signUp,
        signIn,
        signOut,
        // currentUser
    }

    function signUp(email, password) {
        return supabase.auth.signUp({ email: email, password: password });
    }

    function signIn(email, password) {
        return supabase.auth.signInWithPassword({ email: email, password: password });
    }

    function signOut() {
        localStorage.clear();
        console.log("Signing out" + localStorage);
        navigate("/");
        return supabase.auth.signOut();
    }

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("my_user_info");
    //     if (loggedInUser) {
    //         try {
    //             const foundUser = JSON.parse(loggedInUser);
    //             console.log(foundUser);
    //             setCurrentUser(foundUser);
    //         }
    //         catch {
    //             console.log("local storage: " + localStorage)
    //         }
    //     }
    // }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
