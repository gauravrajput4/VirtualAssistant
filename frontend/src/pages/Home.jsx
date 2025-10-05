import React, { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

function Home() {
    const { userdata, serverUrl, setUserdata, getGeminiResponse } =
        useContext(UserDataContext);
    const navigate = useNavigate();

    const [ham, setHam] = useState(false);
    const [listening, setListening] = useState(false);
    const [userText, setUserText] = useState("");
    const [aiText, setAiText] = useState("");
    const [speechEnabled, setSpeechEnabled] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const isSpeakRef = useRef(false);
    const recognitionRef = useRef(null);
    const isRecognitioningRef = useRef(false);
    const synth = window.speechSynthesis;

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            setUserdata(null);
            navigate("/login");
        } catch (err) {
            setUserdata(null);
            console.log(err);
        }
    };

    const startRecognition = () => {
        if (isRecognitioningRef.current || isSpeakRef.current) return;
        try {
            recognitionRef.current?.start();
        } catch (err) {
            if (!err.message.includes("start") && !err.message.includes("already")) {
                console.error("Recognition error ", err);
            }
        }
    };

    const enableSpeech = () => {
        if (!speechEnabled) {
            const testUtterance = new SpeechSynthesisUtterance("");
            synth.speak(testUtterance);
            setSpeechEnabled(true);
        }
    };

    const speak = (text) => {
        if (!text || !text.trim() || !speechEnabled) return;
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;

        isSpeakRef.current = true;
        utterance.onend = () => {
            setAiText("");
            isSpeakRef.current = false;
            setTimeout(() => startRecognition(), 500);
        };
        utterance.onerror = (e) => {
            console.error("Speech error:", e.error);
            isSpeakRef.current = false;
            setAiText("");
            setTimeout(() => startRecognition(), 500);
        };
        synth.speak(utterance);
    };

    const handleCommand = (data) => {
        const { type, userInput, response } = data;
        if (response?.trim()) speak(response);

        const open = (url) => window.open(url, "_blank");

        switch (type) {
            case "google_search":
                open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`);
                break;
            case "calculator_open":
                open("https://www.google.com/search?q=calculator");
                break;
            case "facebook_open":
                open("https://www.facebook.com/");
                break;
            case "instagram_open":
                open("https://www.instagram.com/");
                break;
            case "weather_show":
                open("https://www.google.com/search?q=weather");
                break;
            case "youtube_search":
            case "youtube_play":
                open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(
                        userInput
                    )}`
                );
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            isRecognitioningRef.current = true;
            setListening(true);
        };

        recognition.onend = () => {
            isRecognitioningRef.current = false;
            setListening(false);
            if (!isSpeakRef.current && recognitionRef.current) {
                setTimeout(() => startRecognition(), 1000);
            }
        };

        recognition.onerror = (event) => {
            isRecognitioningRef.current = false;
            setListening(false);
            if (event.error !== "aborted" && !isSpeakRef.current) {
                setTimeout(() => startRecognition(), 2000);
            }
        };

        recognition.onresult = async (e) => {
            const transcript = e.results[e.results.length - 1][0].transcript.trim();
            if (!userdata?.assistantName) return;

            if (transcript
                .toLowerCase()
                .includes(userdata.assistantName.toLowerCase())) {
                const command = transcript
                    .replace(new RegExp(userdata.assistantName, "gi"), "")
                    .trim();
                if (!command) return;
                setUserText(command);
                try {
                    recognition.stop();
                    const data = await getGeminiResponse(command);
                    setAiText(data.response);
                    setUserText("");
                    handleCommand(data);
                } catch (err) {
                    console.error("Error calling assistant:", err);
                    setAiText("");
                    setUserText("");
                    setTimeout(() => startRecognition(), 1000);
                }
            }
        };

        const startTimer = setTimeout(() => {
            if (speechEnabled) startRecognition();
        }, 2000);

        return () => {
            clearTimeout(startTimer);
            recognition.stop();
            recognitionRef.current = null;
            isRecognitioningRef.current = false;
            setListening(false);
        };
    }, [userdata?.assistantName, speechEnabled]);

    return (
        <div
            className="w-full h-screen bg-gradient-to-t from-black to-blue-600 flex flex-col items-center justify-center p-5 relative"
            onClick={enableSpeech}
        >
            {/* Enable Speech Overlay */}
            {!speechEnabled && (
                <div className="fixed inset-0 bg-[#000000a0] flex items-center justify-center z-50">
                    <button
                        onClick={enableSpeech}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 shadow-md"
                    >
                        Enable Voice Assistant
                    </button>
                </div>
            )}

            {/* Hamburger (Mobile) */}
            <GiHamburgerMenu
                className="lg:hidden text-white fixed top-5 right-5 w-[30px] h-[30px] cursor-pointer z-[60]"
                onClick={() => setHam(true)}
            />

            {/* Sidebar (Mobile) */}
            <div
                className={`fixed lg:hidden top-0 left-0 w-full h-full bg-[#00000080] backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-[50] flex flex-col items-start p-[20px] gap-[15px] ${
                    ham ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <RxCross2
                    className="text-white fixed top-[20px] right-[20px] w-[30px] h-[30px] cursor-pointer z-[70]"
                    onClick={() => setHam(false)}
                />

                <button
                    className="mt-[60px] w-full py-3 bg-white rounded-full text-blue-500 font-semibold text-lg hover:bg-blue-50 transition"
                    onClick={() => {
                        setHam(false);
                        handleLogout();
                    }}
                >
                    Log out
                </button>

                <button
                    className="w-full py-3 bg-white rounded-full text-blue-500 font-semibold text-lg hover:bg-blue-50 transition"
                    onClick={() => {
                        setHam(false);
                        navigate("/customize");
                    }}
                >
                    Customize Assistant
                </button>

                <div className="w-full h-[2px] bg-gray-400 my-3"></div>
                <h1 className="text-white font-semibold text-[18px]">History</h1>

                <div className="flex-1 overflow-y-auto w-full">
                    {userdata?.history?.length ? (
                        userdata.history.map((his, i) => (
                            <div
                                key={i}
                                className="text-white text-sm bg-[#ffffff20] rounded-lg p-2 mb-1"
                            >
                                {his}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300 text-sm italic">No history yet.</p>
                    )}
                </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden lg:flex flex-col fixed top-5 right-5 gap-3 z-[40]">
                <button
                    className="min-w-[120px] h-[45px] bg-white rounded-full text-blue-500 font-semibold text-lg hover:bg-blue-50 transition"
                    onClick={handleLogout}
                >
                    Log out
                </button>
                <button
                    className="min-w-[180px] h-[45px] bg-white rounded-full text-blue-500 font-semibold text-lg hover:bg-blue-50 transition"
                    onClick={() => navigate("/customize")}
                >
                    Customize Assistant
                </button>
                <button
                    className="min-w-[120px] h-[45px] bg-white rounded-full text-blue-500 font-semibold text-lg hover:bg-blue-50 transition"
                    onClick={() => setShowHistory(!showHistory)}
                >
                    {showHistory ? "Hide History" : "History"}
                </button>
            </div>

            {/* Desktop History */}
            {showHistory && (
                <div className="hidden lg:flex flex-col fixed top-[160px] right-[20px] w-[300px] h-[calc(100vh-200px)] bg-[#00000080] backdrop-blur-lg rounded-lg p-4 z-[40]">
                    <h1 className="text-white font-semibold text-[18px] mb-3">History</h1>
                    <div className="w-full h-[2px] bg-gray-400 mb-3"></div>
                    <div className="flex-1 overflow-y-auto">
                        {userdata?.history?.length ? (
                            userdata.history.map((his, i) => (
                                <div
                                    key={i}
                                    className="text-white text-sm bg-[#ffffff20] rounded-lg p-2 mb-1"
                                >
                                    {his}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300 text-sm italic text-center mt-4">
                                No history yet.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Assistant Display */}
            <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl mb-6">
                {userdata?.assistantImage ? (
                    <img
                        src={userdata.assistantImage}
                        alt="Assistant"
                        className="h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white font-semibold text-[18px]">
                        No Image
                    </div>
                )}
            </div>

            {/* Assistant Name & Speech */}
            {userdata?.assistantName && (
                <h1 className="text-white text-2xl font-semibold mb-2">
                    I'm {userdata.assistantName}
                </h1>
            )}
            <img src={aiText ? aiImg : userImg} alt="" className="w-[200px]" />
            <h1 className="text-white text-[18px] font-semibold text-wrap text-center px-4">
                {userText || aiText || ""}
            </h1>

            {/* Listening Indicator */}
            {listening && (
                <div className="fixed bottom-5 left-5 bg-green-500 text-white px-3 py-1 rounded-full text-sm shadow-md animate-pulse">
                    Listening...
                </div>
            )}
        </div>
    );
}

export default Home;
