import React, { useEffect, useState } from "react";
import Footer from "./Secondary/Footer";
import axios from 'axios';
import { useNavigate } from "react-router";
import TopLeft from "../Decoration/top-left";
import TopRight from "../Decoration/top-right";
import MiddleLeft from "../Decoration/middle-left";
import MiddleRight from "../Decoration/middle-right";
import BottomLeft from "../Decoration/bottom-left";
import BottomRight from "../Decoration/bottom-right";

export default function Celebrities() {
    const navigate = useNavigate();
    const [celebrity, setCelebrity] = useState([]);
    const [query, setQuery] = useState('');
    const [nationality, setNationality] = useState('');
    const [filteredCelebrities, setFilteredCelebrities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchCelebrities();
    }, []);

    const fetchCelebrities = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/celebrities');
        setCelebrity(response.data);
        setFilteredCelebrities(response.data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let filtered = celebrity;

        if (query.trim() !== '') {
            filtered = filtered.filter(celeb => celeb.name && celeb.name.toLowerCase().includes(query.toLowerCase()));
        }

        if (nationality.trim() !== '') {
            filtered = filtered.filter(celeb => celeb.nationality && celeb.nationality.toLowerCase().includes(nationality.toLowerCase()));
        }

        setFilteredCelebrities(filtered);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCelebrityClick = (id) => {
        navigate('/CelebrityDetails', { state: { id } });
    };

    // Calculate the celebrities to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCelebrities.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCelebrities.length / itemsPerPage);

    return (
    <>
        <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#FF4081"/>
        <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#FF4081"/>
        <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#FF4081"/>
        <MiddleRight className="absolute z-[-1] bottom-[-55%] right-[0%] w-[10%] h-[40%]" fill="#FF4081"/>
        <BottomLeft className="absolute z-[-1] bottom-[-220%] left-[0%] w-[10%] h-[70%]" fill="#FF4081"/>
        <BottomRight className="absolute z-[-1] bottom-[-275%] right-[0%] w-[40%] h-[70%]" fill="#FF4081"/>
        <div className="flex flex-col pb-5 mt-10">
            <div className="flex flex-col items-center px-14 mt-0 w-full max-md:px-5 max-md:mt-0 max-md:max-w-full">
                <p className="mt-28 text-7xl text-neutral-800 max-md:mt-10 max-md:max-w-full max-md:text-4xl">Discover the Favorites of the Stars!</p>
                <section className="search-section">
                <form className="flex gap-5 max-md:flex-col max-md:gap-0 pb-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full">
                        <label className="text-lg font-medium">Name</label>
                        <input className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200" placeholder="Dwayne the Rock" onChange={(e) => setQuery(e.target.value)}/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-lg font-medium"> Nationality </label>
                        <input name="nationality" className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200" placeholder="Morocco" onChange={(e) => setNationality(e.target.value)}/>
                    </div>
                    <button type="submit" className="flex justify-center p-2 mt-12 w-full text-xl font-medium text-black bg-amber-500 rounded-2xl max-md:px-5 max-md:mt-10" aria-label="Search">
                        Search
                    </button>
                    </form>
                </section>
                <p className="self-start mt-28 text-4xl text-neutral-800 max-md:mt-10 max-md:ml-2.5">Popular Celebrities:</p>
                <section className="mt-5">
                    {currentItems.map((celeb) => (
                        <section key={celeb.id} onClick={() => handleCelebrityClick(celeb.id)} className="cursor-pointer flex flex-col pt-7 pr-20 pb-8 pl-7 mt-16 border border-black border-solid bg-stone-100 rounded-[51px] shadow-[0px_4px_35px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                            <div className="flex gap-5 text-5xl font-bold tracking-wide leading-6 text-center text-orange-400 whitespace-nowrap">
                                <img loading="lazy" src={celeb.celebrityimage} className="shrink-0 w-24 aspect-[1.09] fill-orange-400 fill-opacity-50" alt={celeb.name} />
                                <div className="flex-auto my-auto">{celeb.name}</div>
                            </div>
                            <p className="mt-14 text-3xl text-neutral-800 max-md:mt-10 max-md:max-w-full">{celeb.nationality}</p>
                            <p className="mt-4 text-2xl text-neutral-600 max-md:mt-6 max-md:max-w-full">{celeb.description}</p>
                        </section>
                    ))}
                </section>
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className={`mx-2 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-amber-500 text-white'}`}
                    >
                        First
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`mx-2 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-amber-500 text-white'}`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`mx-2 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-amber-500 text-white'}`}
                    >
                        Next
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`mx-2 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-amber-500 text-white'}`}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
        <Footer className="p-4"/>
    </>
    );
}
