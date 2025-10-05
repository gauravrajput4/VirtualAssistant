import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";

function Card({ image }) {
    const { selected, setSelected, setFrontend } = useContext(UserDataContext);

    return (
        <div
            className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] rounded-2xl overflow-hidden cursor-pointer border-2 transition hover:border-4 hover:border-white hover:shadow-2xl hover:shadow-blue-950 ${
                selected === image ? "border-4 border-white shadow-2xl shadow-blue-950" : "border-blue-600"
            }`}
            onClick={() => {
                setSelected(image);
                setFrontend(image);
            }}
        >
            <img src={image} alt="assistant" className="w-full h-full object-cover" />
        </div>
    );
}

export default Card;
