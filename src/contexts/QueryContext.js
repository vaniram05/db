import React, { useContext } from "react";
import { supabase } from "../supabaseClient";

const QueryContext = React.createContext();

export function useQuery() {
    return useContext(QueryContext);
}

export function QueryProvider({ children }) {
    const value = {
        submitTestReqForm,
        getTestRequests,
        isUserAdmin,
        getFilteredRequests,
        updateTable
    }

    async function submitTestReqForm(formContent) {
        const { data, error } = await supabase
            .from('testrequests')
            .insert([formContent])
            .select()
        return { data, error }
    }

    async function updateTable(ids_list, total_ids_list) {
        try {
            for (var i = 0; i < ids_list.length; i++) {
                const { data, error } = await supabase
                    .from('testrequests')
                    .update({ approval: 'Yes' }).eq('id', ids_list[i])
                    .select();
                console.log(data)
            }
            for (var i = 0; i < total_ids_list.length; i++) {
                const { data, error } = await supabase
                    .from('testrequests')
                    .update({ approval: 'No' }).eq('id', total_ids_list[i])
                    .select();
                console.log(data)
            }
        } catch {
            console.log('missed')
        }
    }

    async function getTestRequests() {
        const { data, error } = await supabase
            .from('testrequests')
            .select('*')
            .order('created_at', { ascending: false })
        return [data, error]
    }

    async function getFilteredRequests() {
        const { data, error } = await supabase
            .from('testrequests')
            .select('*')
            .eq('approval', 'Not yet')
            .order('created_at', { ascending: false })
        return [data, error]
    }

    async function isUserAdmin(user_id) {
        const { data, error } = await supabase
            .from('admins')
            .select()
            .eq('user_id', user_id)
        return { data, error }
    }

    return (
        <QueryContext.Provider value={value}>
            {children}
        </QueryContext.Provider>
    );
}