import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext();

function UserContext({ children }) {
    const serverUrl = "http://localhost:8000";

    // Global states
    const [userdata, setUserdata] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ New states
    const [frontend, setFrontend] = useState(null);   // preview image (UI)
    const [backend, setBackend] = useState(null);     // actual file
    const [selected, setSelected] = useState(null);   // selected card index

    // Fetch current user
    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, {
                withCredentials: true,
            });
            setUserdata(result.data);
        } catch (error) {
            console.error(
                "Error fetching current user:",
                error.response?.data || error.message
            );
            setUserdata(null);
        } finally {
            setLoading(false);
        }
    };



    const getGeminiResponse = async (command) => {
        try {
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, {command},{withCredentials:true});

            return result.data;
        }
        catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        handleCurrentUser();
    }, []);

    // Context value
    const value = {
        serverUrl,
        userdata,
        setUserdata,
        loading,
        refreshUser: handleCurrentUser,

        // ✅ new global values
        frontend,
        setFrontend,
        backend,
        setBackend,
        selected,
        setSelected,
        getGeminiResponse,
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext;
