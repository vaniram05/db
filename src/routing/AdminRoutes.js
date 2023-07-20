import React, { useEffect, useState } from 'react';
import { useQuery } from "../contexts/QueryContext";
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function AdminRoutes() {
    const { isUserAdmin, getFilteredRequests } = useQuery();
    const [admin, setAdmin] = useState();
    const [filtReqs, setfiltReqs] = useState();

    const adminChecker = async () => {
        const jsonInfo = JSON.parse(localStorage.getItem('my_user_info'));
        const { data, error } = await isUserAdmin(jsonInfo.id);
        if (data.length > 0) {
            try {
                const [data2, error2] = await getFilteredRequests()
                setfiltReqs(data2);
            } catch {}
            setAdmin(true);
        }
    }

    useEffect(() => {
        adminChecker();
    }, []);

    return (
        <>
            {(admin) ? <>
                <Outlet context={[filtReqs]}/>
            </> :
                <><Container>
                    Sorry, you need admin access for this screen ):</Container></>}
        </>
    )
}