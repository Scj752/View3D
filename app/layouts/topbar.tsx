import { 
    Form,
    Outlet,
} from "react-router";

import {
    SquareBackground,
    MultiSquaresBackground,
    ParticleBackground,
} from "./background";

export default function Topbar() {
    return (
        <>
            <div className="relative">
                <div className="z-100 fixed w-full top-0 bg-gradient-to-r from-purple-600 to-pink-600 shadow-md">
                    <div className="flex justify-between items-center h-20 px-10">
                        <h1 className="font-sans text-3xl font-bold text-white">
                            <a href="/">View 3D</a>
                        </h1>
                        <div className="flex items-center space-x-4">
                            <Form>
                                <div className="relative">
                                    <svg className="w-6 h-6 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" aria-hidden="true" viewBox="-2 -2 28 28">
                                        <g>
                                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                        </g>
                                    </svg>
                                    <input
                                        placeholder="Search"
                                        className="border-none w-80 h-10 pl-12 pr-4 outline-none bg-white rounded-full transition duration-300 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </Form>
                            <Form>
                                <button className="btn-primary flex items-center space-x-1" type="button">
                                    <i className="fa fa-upload"></i> 
                                    <span>Upload</span>
                                </button>
                            </Form>
                            <button className="btn-primary flex items-center space-x-1">
                                <i className="fa fa-user"></i> 
                                <span>Login/Register</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}