import { Navigate, Outlet } from "react-router-dom";
import React from 'react';
import MenuNav from "../components/MenuNav";

function PrivateRoutes() {
    return (
        (localStorage.getItem('my_user_info')) ?
            <>
                <MenuNav />
                <Outlet />
            </>
            :
            <Navigate to="/" />
    )
}

export default PrivateRoutes;