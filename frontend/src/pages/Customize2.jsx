import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useNavigate} from "react-router-dom";

function Customize2() {
    const { serverUrl, userdata, setUserdata, backend, selected } = useContext(UserDataContext);
    const [assistantName, setAssistantName] = useState(userdata?.assistantName || "");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleUpdateAssistant = async () => {
        setLoading(true);
        try {
            let formData = new FormData();
            formData.append("assistantName", assistantName);

            if (backend && backend instanceof File) {
                formData.append("assistantImage", backend);
            } else if (selected) {
                formData.append("imageUrl", selected);
            } else {
                formData.append("imageUrl", "");
            }

            const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
                withCredentials: true,
            });

            setLoading(false);

            console.log(result.data);
            setUserdata(result.data);
            navigate("/");
        } catch (error) {
            setLoading(false);
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-t from-black to-blue-600 flex flex-col items-center justify-center p-5 relative">
            <IoMdArrowRoundBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>{
                navigate("/customize");
            }}/>
            <h1 className="text-white text-2xl md:text-3xl text-center mb-16">
                Enter your <span className="text-amber-500">Assistant Name</span>
            </h1>

            <input
                type="text"
                placeholder="e.g Shifra"
                className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[18px]"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
            />

            {assistantName && (
                <button
                    className="min-w-[300px] h-[60px] mt-6 rounded-full bg-white text-blue-400 font-semibold text-lg hover:bg-blue-50 transition cursor-pointer" disabled={loading}
                    onClick={handleUpdateAssistant}

                >
                    { !loading ?"Create Your Assistant":"Loading.."}
                </button>
            )}
        </div>
    );
}

export default Customize2;
