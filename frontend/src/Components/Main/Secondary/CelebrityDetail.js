import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import TopLeft from "../../Decoration/top-left";
import TopRight from "../../Decoration/top-right";
import MiddleLeft from "../../Decoration/middle-left";
import MiddleRight from "../../Decoration/middle-right";
import BottomLeft from "../../Decoration/bottom-left";
import BottomRight from "../../Decoration/bottom-right";
import Footer from './Footer';

export default function CelebrityDetails() {
    const [celebrity, setCelebrity] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { id } = location.state || {};

    useEffect(() => {
        const fetchCelebrity = async (id) => {
            if (!id) {
                setError("Celebrity ID is missing.");
                return;
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/celebrities/${id}`);
                setCelebrity(response.data);
                } catch (error) {
                console.error("Error fetching celebrity:", error);
                setError("Failed to load the celebrity. Please try again later.");
            }
        };

        fetchCelebrity(id);
    }, [id]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!celebrity) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <>
            <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#FF4081"/>
            <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#FF4081"/>
            <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#FF4081"/>
            <MiddleRight className="absolute z-[-1] bottom-[-60%] right-[0%] w-[10%] h-[40%]" fill="#FF4081"/>
            <BottomLeft className="absolute z-[-1] bottom-[-120%] left-[0%] w-[10%] h-[70%]" fill="#FF4081"/>
            <BottomRight className="absolute z-[-1] bottom-[-165%] right-[0%] w-[40%] h-[70%]" fill="#FF4081"/>
            <div className="mx-auto p-5">
                <main className="box-border flex relative flex-col shrink-0 mt-5">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <section className="flex flex-col max-md:ml-0 max-md:w-full">
                            <div>
                                <img className="rounded-3xl mb-10 shadow" src={celebrity.celebrityimage} alt={celebrity.name} />
                            </div>
                            <h2 className="ml-5 mt-2.5 text-2xl text-neutral-800 max-md:mt-10 ">Details: </h2>
                            <div className="flex flex-col text-2xl pl-10 pr-40 py-9 w-full whitespace-nowrap shadow-2xl backdrop-blur bg-white bg-opacity-80 rounded-[52px] max-md:px-5 max-md:mt-10 mb-10">
                                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Name: {celebrity.name}</p>
                                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Nationality: {celebrity.nationality}</p>
                                <p className='p-2 bg-stone-100 my-2 rounded-3xl'>Experience: {celebrity.experience}</p>
                            </div>
                        </section>
                        <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
                            <h1 className="text-4xl font-bold text-gray-800">{celebrity.name}</h1>
                            <p className="mt-11 font-medium text-black max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                                {celebrity.description}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            <Footer className="p-3"/>
        </>
    );
}