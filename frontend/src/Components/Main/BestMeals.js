import * as React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Flag from 'react-world-flags';
import Guide from "./Secondary/Guide";
import Footer from "./Secondary/Footer";

import { useState } from "react";
import { useNavigate } from "react-router";
import TopLeft from "../Decoration/top-left";
import TopRight from "../Decoration/top-right";
import MiddleLeft from "../Decoration/middle-left";
import MiddleRight from "../Decoration/middle-right";
import BottomLeft from "../Decoration/bottom-left";
import BottomRight from "../Decoration/bottom-right";

const favorites = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4750ed5c49da6e2ea4248c60761a33086bd7e130def86f282b3b40740174d937?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Bolognese Image", text: "Bolognese", calories: 297, country: "Italian", countryCode : "it"},
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd739cecf42e69beff7f894ff82e25687b8c5f0a144e4aad4678b83192b90038?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", "alt": "Pelmeni Image", "text": "Pelmeni", "calories": 300, "country": "Russian", "countryCode": "ru"},
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/750efd18431c7d504f6b4567dca45d011b6d13dec16e0d6764409d4af5a2d85e?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", "alt": "Romazava Image", "text": "Romazava", "calories": 250, "country": "Madagascan", "countryCode": "mg"},
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", "alt": "Tagine Image", "text": "Tagine", "calories": 350, "country": "Moroccan", "countryCode": "ma"},
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5cafea37bc3bff98975ad2e11a4d004425e6bbc042a1b50745a23c4f6c40d7?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", "alt": "Al Kabsa Image", "text": "Al Kabsa", "calories": 400, "country": "Saudi Arabian", "countryCode": "sa"},
    ];

const suggestions = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4750ed5c49da6e2ea4248c60761a33086bd7e130def86f282b3b40740174d937?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Bolognese Image", text: "Bolognese" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5cafea37bc3bff98975ad2e11a4d004425e6bbc042a1b50745a23c4f6c40d7?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Al Kabsa Image", text: "Al Kabsa" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/750efd18431c7d504f6b4567dca45d011b6d13dec16e0d6764409d4af5a2d85e?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Romazava Image", text: "Romazava" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd739cecf42e69beff7f894ff82e25687b8c5f0a144e4aad4678b83192b90038?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Pelmeni Image", text: "Pelmeni" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Tagine Image", text: "Tagine" },
];

const bestMeals = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4750ed5c49da6e2ea4248c60761a33086bd7e130def86f282b3b40740174d937?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Bolognese Image", text: "Bolognese" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5cafea37bc3bff98975ad2e11a4d004425e6bbc042a1b50745a23c4f6c40d7?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Al Kabsa Image", text: "Al Kabsa" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/750efd18431c7d504f6b4567dca45d011b6d13dec16e0d6764409d4af5a2d85e?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Romazava Image", text: "Romazava" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd739cecf42e69beff7f894ff82e25687b8c5f0a144e4aad4678b83192b90038?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Pelmeni Image", text: "Pelmeni" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&", alt: "Tagine Image", text: "Tagine" },
];

const responsive = {
    superLargeDesktop: {breakpoint: { max: 4000, min: 3000 },items: 5},
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3},
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2},
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1}
};

export default function Home() {
    const [title, setTitle] = useState('');
    const [region, setRegion] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/recettes', { state: { title, region } });
      };

    return (
        <>
        <TopLeft className="absolute z-[-1] top-[0] left-[0] w-[29%] h-[30%]" fill="#00BFFF"/>
        <TopRight className="absolute z-[-1] top-[0] right-[0] w-[29%] h-[40%]" fill="#00BFFF"/>
        <MiddleLeft className="absolute z-[-1] top-[87%] left-[-45%] w-[100%] h-[50%]" fill="#00BFFF"/>
        <MiddleRight className="absolute z-[-1] bottom-[-55%] right-[0%] w-[10%] h-[40%]" fill="#00BFFF"/>
        <BottomLeft className="absolute z-[-1] bottom-[-280%] left-[0%] w-[10%] h-[70%]" fill="#00BFFF"/>
        <BottomRight className="absolute z-[-1] bottom-[-350%] right-[0%] w-[40%] h-[70%]" fill="#00BFFF"/>
        <main className="main-content">
        <section className="search-section">
          <form className="flex gap-5 max-md:flex-col max-md:gap-0 pb-3" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <label className="text-lg font-medium"> Meal </label>
              <input
                name="meal"
                className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200"
                placeholder="Tagine"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-lg font-medium"> Region </label>
              <input
                name="region"
                className="justify-center p-3 mt-3 rounded-2xl border border-solid border-zinc-200"
                placeholder="Morocco"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <button type="submit" className="flex justify-center p-3 mt-11 w-50 h-[30%] text-xl font-medium text-black bg-amber-500 rounded-2xl max-md:px-5 max-md:mt-10" aria-label="Search"> Search </button>
          </form>
        </section>
            <div className="flex flex-col pt-11 pb-5">
                <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full"> Best Meals </h2>
                <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
                    <Carousel responsive={responsive}>
                        {favorites.map((item, index) => (
                            <div key={index} className="flex flex-col flex-1 self-start mt-2 bg-gray-100 shadow-lg m-3 rounded-3xl">
                                <img loading="lazy" src={item.src} alt={item.alt} className="w-full aspect-[1.47] p-5"/>
                                <div className="self-start ml-12 max-md:ml-2.5">{item.text}</div>
                                <div className="relative self-start mt-9 ml-12 text-4xl font-bold text-black max-md:ml-2.5"> Calories : {item.calories} </div>
                                <div className="self-start ml-12 max-md:ml-2.5 flex my-6">
                                <Flag code={item.countryCode} className="w-12 h-12" />
                                <p className="text-black p-1 px-4">{item.country}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="flex flex-col pt-11 pb-5">
            <section className="flex flex-col w-full max-md:max-w-full">
            <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full"> Top Rated </h2>
                <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
                <Carousel responsive={responsive}>
                    {favorites.map((item, index) => (
                    <div key={index} className="flex flex-col flex-1 self-start mt-2 whitespace-nowrap">
                        <img loading="lazy" src={item.src} alt={item.alt} className="w-full aspect-[1.47] p-5"/>
                        <div className="self-start ml-12 max-md:ml-2.5">{item.text}</div>
                    </div>
                    ))}
                </Carousel>
                </div>
                <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full"> New Add </h2>
                <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
                <Carousel responsive={responsive}>
                    {suggestions.map((item, index) => (
                    <div key={index} className="flex flex-col flex-1 self-start mt-2 whitespace-nowrap">
                        <img loading="lazy" src={item.src} alt={item.alt} className="w-full aspect-[1.47] p-5"/>
                        <div className="self-start ml-12 max-md:ml-2.5">{item.text}</div>
                    </div>
                    ))}
                </Carousel>
                </div>
                <h2 className="mt-20 pl-10 text-4xl max-md:mt-10 max-md:max-w-full"> Celebrities Favorite </h2>
                <div className="flex flex-col w-full text-3xl text-teal-400 max-md:pl-5 max-md:max-w-full">
                <Carousel responsive={responsive}>
                    {bestMeals.map((item, index) => (
                    <div key={index} className="flex flex-col flex-1 self-start mt-2 whitespace-nowrap">
                        <img loading="lazy" src={item.src} alt={item.alt} className="w-full aspect-[1.47] p-5"/>
                        <div className="self-start ml-12 max-md:ml-2.5">{item.text}</div>
                    </div>
                    ))}
                </Carousel>
                </div>
            </section>
            </div>
            <Guide />
            <Footer />
        </main>
        </>
    );
}