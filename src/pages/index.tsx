import PublicLayout from "@/Layouts/PublicLayout";
import { IoBookmarkOutline } from "react-icons/io5";

import React from "react";

const index = () => {
  return (
    <PublicLayout>
      <div className="main-container ">
        <h1 className="text-[42px] tracking-tighter font-[400]">
          NEW ITEMS <span className="text-[42px] font-[200]">OF THIS SEASON</span>
        </h1>
        <div className="flex overflow-x-auto overflow-hidden gap-4 mt-6  ">
          <div className="w-[15vw] min-h-[45vh] rounded-lg pb-3 group">
            <div className="w-[100%]  m-auto  rounded-sm overflow-hidden relative">
              <img
                src="/Images/HomePageImg/img1.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              The Edge of Tomorrow
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Action, <span>Triler</span>
            </p>
          </div>
          <div className="w-[15vw] min-h-[45vh] rounded-lg pb-3 group">
            <div className="w-[100%] m-auto  rounded-sm overflow-hidden relative">
              <img
                src="/Images/HomePageImg/img2.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              Benched
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Comedy
            </p>
          </div>
          <div className="w-[15vw] min-h-[45vh] rounded-lg pb-3 group">
            <div className="w-[100%] m-auto  rounded-sm overflow-hidden relative ">
              <img
                src="/Images/HomePageImg/img3.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              Green Hell
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Romance, <span>Drama</span>
            </p>
          </div>
          <div className="w-[15vw] min-h-[45vh] rounded-lg pb-3 group">
            <div className="w-[100%]  m-auto  rounded-sm overflow-hidden relative ">
              <img
                src="/Images/HomePageImg/img4.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              Survival Spliton
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Comedy, <span>Drama</span>
            </p>
          </div>
          <div className="w-[15vw] min-h-[45vh]  rounded-lg pb-3 group">
            <div className="w-[100%] x m-auto  rounded-sm overflow-hidden relative ">
              <img
                src="/Images/HomePageImg/img5.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              The Chebod
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Drama
            </p>
          </div>
          <div className="w-[15vw] min-h-[45vh] rounded-lg pb-3 group">
            <div className="w-[100%] m-auto  rounded-sm overflow-hidden relative ">
              <img
                src="/Images/HomePageImg/img3.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              Green Hell
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Romance, <span>Drama</span>
            </p>
          </div>
          <div className="w-[15vw] min-h-[45vh] rounded-lg pb-3 group">
            <div className="w-[100%]  m-auto  rounded-sm overflow-hidden relative ">
              <img
                src="/Images/HomePageImg/img4.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              Survival Spliton
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Comedy, <span>Drama</span>
            </p>
          </div>
          <div className="w-[15vw] min-h-[45vh]  rounded-lg pb-3 group">
            <div className="w-[100%] x m-auto  rounded-sm overflow-hidden relative ">
              <img
                src="/Images/HomePageImg/img5.jpg"
                alt=""
                loading="lazy"
                className="w-[100%] h-[100%]"
              />
              <p
                className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10  scale-100 transition-all duration-300 
                  flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer"
              >
                7.8
              </p>

              <p
                className="w-10 h-10 rounded-sm  bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 
                  group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold"
              >
                <IoBookmarkOutline className="text-2xl cursor-pointer" />
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
              The Chebod
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              Drama
            </p>
          </div>
        </div>
      </div>



      <div className="main-container mt-16 pb-3">
        <h1 className="font-medium text-4xl">Recently Update</h1>
        <div className="menu flex gap-16 mt-6">
          <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
            New Items
          </p>
          <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
            Movies
          </p>
          <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
            TV Shows
          </p>
          <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
            Anime
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default index;
