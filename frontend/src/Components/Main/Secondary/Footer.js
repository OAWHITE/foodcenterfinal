// Footer.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Footer({ className }) {
    const navigate = useNavigate();

    return (
        <div className={ className }>
            <footer className="flex flex-col footer-bg mt-5 p-4 rounded-3xl">
                    <div className="flex gap-5 justify-between px-3">
                        <section className="flex flex-col">
                            <h1 className="text-3xl font-bold leading-6 capitalize"> FOOD CENTER </h1>
                            <p className="mt-6 text-l footer-description"> Shipper is a company that focuses on food delivery </p>
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/dae81e5845d9f15a25bfbf5cd1f96f6e48e570fb5b4c592a772dc235fab51619?apiKey=e15653f4f4ba4d0f8f02d4f65a81a2f4&" alt="" className="mt-6 max-w-full aspect-[5.88] w-[254px]" />
                        </section>
                        <nav className="flex gap-5 justify-between text-xl">
                            <div className="flex flex-col">
                                <h3 className="font-bold">Navigate</h3>
                                <div className="flex flex-col mt-6">
                                    <NavLink to="/home" className="footer-nav">Home</NavLink>
                                    <NavLink to="#" className="footer-nav">Advantages</NavLink>
                                    <NavLink to="#" className="footer-nav">Feature</NavLink>
                                    <NavLink to="#" className="footer-nav">Feedback</NavLink>
                                    <NavLink to="/ingredients-search" className="footer-nav">Ingredients Search</NavLink> {/* New Link */}
                                </div>
                            </div>
                            <div className="flex flex-col self-start">
                                <h3 className="font-bold">About</h3>
                                <div className="flex flex-col mt-6 leading-[140%]">
                                    <NavLink to="#" className="footer-nav">Blog</NavLink>
                                    <NavLink to="#" className="footer-nav">Events</NavLink>
                                    <NavLink to="#" className="footer-nav">Careers</NavLink>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="flex gap-5 footer-rights leading-7 max-md:flex-wrap max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                        <div className="flex-auto text-neutral-400">Copyright © AOWHITE</div>
                        <div className="flex gap-5 text-white max-md:flex-wrap max-md:max-w-full">
                            <NavLink to="#">Terms</NavLink>
                            <NavLink to="#">Privacy</NavLink>
                            <NavLink to="#" className="flex-auto">Policy & Cookie Policy</NavLink>
                        </div>
                    </div>
            </footer>
        </div>
    )
}
