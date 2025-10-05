import React, { useContext, useRef } from "react";
import Card from "../components/Card.jsx";
import { RiImageAddLine } from "react-icons/ri";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

// Images
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.jpg";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.jpeg";
import img7 from "../assets/image7.jpeg";
import {IoMdArrowRoundBack} from "react-icons/io";

function Customize() {
    const navigate = useNavigate();
    const { frontend, setFrontend, setBackend, selected, setSelected } = useContext(UserDataContext);
    const inputImage = useRef();

    const handleImage = (e) => {
        const image = e.target.files[0];
        setBackend(image);
        setFrontend(URL.createObjectURL(image));
    };

    return (
        <div className="w-full h-screen bg-gradient-to-t from-black to-blue-600 flex flex-col items-center justify-center p-5 relative">
            <IoMdArrowRoundBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>{
                navigate("/");
            }}/>
            <h1 className="text-white text-2xl md:text-3xl text-center mb-16">
                Select your <span className="text-amber-500">Assistant image</span>
            </h1>

            <div className="w-[90%] max-w-[900px] flex flex-wrap justify-center gap-5">
                <Card image={img1} />
                <Card image={img2} />
                <Card image={img4} />
                <Card image={img5} />
                <Card image={img6} />
                <Card image={img7} />

                {/* Upload option */}
                <div
                    className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-blue-800 border-2 rounded-2xl flex items-center justify-center cursor-pointer transition hover:border-4 hover:border-white hover:shadow-2xl hover:shadow-blue-950 ${
                        selected === "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : "border-blue-600"
                    }`}
                    onClick={() => {
                        inputImage.current.click();
                        setSelected("input");
                    }}
                >
                    {!frontend && <RiImageAddLine className="text-white w-6 h-6" />}
                    {frontend && <img src={frontend} alt="preview" className="h-full w-full object-cover" />}
                </div>
                <input type="file" accept="image/*" ref={inputImage} hidden onChange={handleImage} />
            </div>

            {selected && (
                <button
                    className="min-w-[150px] h-[60px] mt-6 rounded-full bg-white text-blue-400 font-semibold text-lg hover:bg-blue-50 transition cursor-pointer"
                    onClick={() => navigate("/customize2")}
                >
                    Next
                </button>
            )}
        </div>
    );
}

export default Customize;
