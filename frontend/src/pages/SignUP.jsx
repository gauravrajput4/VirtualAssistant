import bgimg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

function SignUP() {
    const { serverUrl ,userdata, setUserdata} = useContext(UserDataContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/signup`,
                { name, email, password },
                { withCredentials: true }
            );
            console.log("Signup successful:", result.data);
            setUserdata(result.data);
            navigate("/customize");
        } catch (err) {
            console.error(
                "Signup error:",
                err.response ? err.response.data : err.message
            );
            userdata(null);
            setUserdata(null);
            setError(
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div
            className="w-full h-[100vh] bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${bgimg})` }}
        >
            <form
                className="w-[90%] h-[700px] max-w-[600px] bg-[#00000069] backdrop-blur shadow-lg shadow-blue-800
        flex flex-col items-center justify-center gap-5 px-5 py-6 rounded-lg"
                onSubmit={handleSignUp}
            >
                <h1 className="text-white text-3xl font-semibold mb-6 text-center">
                    Register to Virtual <span className="text-blue-400">Assistant</span>
                </h1>

                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[18px]"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[18px]"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <div className="relative w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px]">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full h-full outline-none bg-transparent px-5 rounded-full text-[18px] placeholder-gray-300"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {!showPassword ? (
                        <IoEye
                            className="absolute top-[18px] right-5 text-white w-6 h-6 cursor-pointer"
                            onClick={() => setShowPassword(true)}
                        />
                    ) : (
                        <IoEyeOff
                            className="absolute top-[18px] right-5 text-white w-6 h-6 cursor-pointer"
                            onClick={() => setShowPassword(false)}
                        />
                    )}
                </div>
                {error && (
                    <p className="text-red-500 font-medium text-center">
                        *{error}
                    </p>
                )}
                <button
                    type="submit"
                    className="min-w-[150px] h-[60px] bg-white rounded-full text-blue-400 font-semibold text-lg mt-6 hover:bg-blue-50 transition"
                >
                    Signup
                </button>

                <p
                    className="text-white mt-4 cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    Already have an account?{" "}
                    <span className="text-blue-400 text-[18px]">Log in</span>
                </p>
            </form>
        </div>
    );
}

export default SignUP;
