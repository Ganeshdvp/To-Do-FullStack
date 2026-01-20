import React from "react";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";
import { ArrowBigRight, ArrowRight } from "lucide-react";

export const HomePage = () => {


  return (
    <>
      <NavBar />
      <div className="text-center flex flex-col items-center justify-center mt-40 space-y-6">
        <h2 className="text-5xl font-bold">"To-Do Application"</h2>
        <p className="max-w-2xl text-md text-gray-600">
          A production-ready Todo application with advanced task management,
          prioritization, filtering, persistence, and accessibility features
          designed for scalability and real-world usage.
        </p>
        <Link to='/main'>
        <button className="flex items-center p-2 pl-4 pr-4 text-sm bg-[#DDE800] rounded-md mt-4 cursor-pointer hover:bg-[#f2ff00] hover:text-black hover:font-bold hover:scale-105">
          Get Started <ArrowRight size={16}/>
        </button>
        </Link>
      </div>
    </>
  );
};
