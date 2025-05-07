// import PublicLayout from "@/Layouts/PublicLayout";
// import { IoBookmarkOutline } from "react-icons/io5";

// const index = () => {
//   const movies = [
//     {
//       title: "The Edge of Tomorrow",
//       genres: ["Action", "Triler"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img1.jpg",
//     },
//     {
//       title: "Benched",
//       genres: ["Comedy"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img2.jpg",
//     },
//     {
//       title: "Green Hell",
//       genres: ["Romance", "Drama"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img3.jpg",
//     },
//     {
//       title: "Survival Spliton",
//       genres: ["Comedy", "Drama"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img4.jpg",
//     },
//     {
//       title: "The Chebod",
//       genres: ["Drama"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img5.jpg",
//     },
//     // repeated items (if intentional)
//     {
//       title: "Green Hell",
//       genres: ["Romance", "Drama"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img3.jpg",
//     },
//     {
//       title: "Survival Spliton",
//       genres: ["Comedy", "Drama"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img4.jpg",
//     },
//     {
//       title: "The Chebod",
//       genres: ["Drama"],
//       rating: 7.8,
//       image: "/Images/HomePageImg/img5.jpg",
//     },
//   ];

//   return (
//     <PublicLayout>
//       <div className="main-container ">
//         <h1 className="text-[42px] tracking-tighter font-[400]">
//           NEW ITEMS{" "}
//           <span className="text-[42px] font-[200]">OF THIS SEASON</span>
//         </h1>

//         {/* Horizontal scrollable section for cards */}
//         <div className="overflow-x-auto mt-6 hide-scrollbar ">
//           <div className="flex gap-4 w-max">
//             {movies.map((movie, index) => (
//               <div
//                 key={index}
//                 className="w-[200px] min-h-[45vh] rounded-lg pb-3 group flex-shrink-0"
//               >
//                 <div className="w-full m-auto rounded-sm overflow-hidden relative h-[300px]">
//                   <img
//                     src={movie.image}
//                     alt={movie.title}
//                     loading="lazy"
//                     className="w-full h-full object-cover"
//                   />
//                   <p className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10 scale-100 transition-all duration-300 flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer">
//                     {movie.rating}
//                   </p>
//                   <p className="w-10 h-10 rounded-sm bg-black absolute top-4 right-5 z-10 opacity-0 scale-100 transition-all duration-300 group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold">
//                     <IoBookmarkOutline className="text-2xl cursor-pointer" />
//                   </p>
//                 </div>
//                 <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer group-hover:transition-all duration-300">
//                   {movie.title}
//                 </p>
//                 <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
//                   {movie.genres.map((genre, i) => (
//                     <span key={i}>
//                       {genre}
//                       {i < movie.genres.length - 1 && ", "}
//                     </span>
//                   ))}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="main-container mt-16 pb-3">
//         <h1 className="font-medium text-4xl">Recently Update</h1>
//         <div className="menu flex gap-16 mt-6">
//           <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
//             New Items
//           </p>
//           <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
//             Movies
//           </p>
//           <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
//             TV Shows
//           </p>
//           <p className="text-[2.45vh] pb-4 border-b-2 border-b-transparent hover:border-b-yellow-400 cursor-pointer hover:text-yellow-400 transition-all duration-200">
//             Anime
//           </p>
//         </div>
//       </div>
//     </PublicLayout>
//   );
// };

// export default index;

import PublicLayout from "@/Layouts/PublicLayout";
import { useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";

const index = () => {
  const movies = [
    {
      title: "The Edge of Tomorrow",
      genres: ["Action", "Thriller"], // Fixed typo: "Triler" → "Thriller"
      rating: 7.8,
      image: "/Images/HomePageImg/img1.jpg",
    },
    {
      title: "Benched",
      genres: ["Comedy"],
      rating: 7.8,
      image: "/Images/HomePageImg/img2.jpg",
    },
    {
      title: "Green Hell",
      genres: ["Romance", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img3.jpg",
    },
    {
      title: "Survival Spliton",
      genres: ["Comedy", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img4.jpg",
    },
    {
      title: "The Chebod",
      genres: ["Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img5.jpg",
    },
    {
      title: "Green Hell",
      genres: ["Romance", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img3.jpg",
    },
    {
      title: "Survival Spliton",
      genres: ["Comedy", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img4.jpg",
    },
    {
      title: "The Chebod",
      genres: ["Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img5.jpg",
    },
  ];

  const one = {
    id: 1,
    title: "The Edge of Tomorrow",
    genres: ["Action", "Thriller"],
    rating: 7.8,
    image: "/Images/HomePageImg/img1.jpg",
  };
  const two = {
    id: 2,
    title: "Inception",
    genres: ["Sci-Fi", "Action"],
    rating: 8.5,
    image: "/Images/HomePageImg/img2.jpg",
  };
  const three = {
    id: 3,
    title: "Breaking Bad",
    genres: ["Crime", "Drama"],
    rating: 9.2,
    image: "/Images/HomePageImg/img3.jpg",
  };
  const four = {
    id: 4,
    title: "Naruto",
    genres: ["Anime", "Adventure"],
    rating: 8.0,
    image: "/Images/HomePageImg/img4.jpg",
  };
  // Tab Select karne ke liye
  const tabData = {
    "New Items": one,
    Movies: two,
    "TV Shows": three,
    Anime: four,
  };

  const [rcUpdate, setRCUpdate] = useState(tabData["New Items"]);
  const [activeTab, setActiveTab] = useState("New Items");
  type TabKey = keyof typeof tabData;
  const rcClickHandler = (tab: TabKey) => {
    setRCUpdate(tabData[tab]);
    setActiveTab(tab);
  };

  return (
    <PublicLayout>
      <div className="main-container ">
        {/* Fixed Header Content */}
        <h1 className="text-[42px] tracking-tighter font-[400]">
          NEW ITEMS{" "}
          <span className="text-[42px] font-[200]">OF THIS SEASON</span>
        </h1>

        {/* Horizontal Scrollable Section for Cards */}
        <div className="mt-6 hide-scrollbar  max-w-full overflow-x-auto">
          <div className="flex gap-4 w-[100%]">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="w-[15.45vw] min-h-[45vh] rounded-lg pb-3 group flex-shrink-0 snap-center"
              >
                <div className="w-full rounded-sm relative h-[300px]">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <p className="w-10 h-10 rounded-full bg-transparent border-1 border-green-400 absolute top-4 left-5 z-10 flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer">
                    {movie.rating}
                  </p>
                  <p className="w-10 h-10 rounded-sm bg-black absolute top-4 right-5 z-10 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[1.1rem] font-bold transition-all duration-300">
                    <IoBookmarkOutline className="text-2xl cursor-pointer" />
                  </p>

                  {/* Play Button */}
                  <img
                    src="/Images/HomePageImg/play.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 w-12 h-12 scale-50 group-hover:scale-100"
                  />
                </div>
                <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer transition-all duration-300">
                  {movie.title}
                </p>
                <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
                  {movie.genres.map((genre, i) => (
                    <span key={i}>
                      {genre}
                      {i < movie.genres.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Recently Updated Section */}
      <div className="main-container w-full max-w-[1200px] mx-auto px-4 mt-16 pb-3">
        <h1 className="font-medium text-4xl">Recently Updated</h1>

        <div className="menu flex gap-16 mt-6">
          {Object.keys(tabData).map((tab: any) => (
            <p
              key={tab}
              className={`text-[2.45vh] pb-4 border-b-2 ${
                activeTab === tab
                  ? "border-b-yellow-400 text-yellow-400"
                  : "border-b-transparent hover:border-b-yellow-400 hover:text-yellow-400"
              } cursor-pointer transition-all duration-200`}
              onClick={() => rcClickHandler(tab)}
            >
              {tab}
            </p>
          ))}
        </div>

        <div className="content mt-6">
          <div className="w-[15.45vw] min-h-[45vh] rounded-lg pb-3 group flex-shrink-0 snap-center">
            <div className="w-full rounded-sm relative h-[300px]">
              <img
                src={rcUpdate.image}
                alt={rcUpdate.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <p className="w-10 h-10 rounded-full bg-transparent border border-green-400 absolute top-4 left-5 z-10 flex items-center justify-center text-white text-[1.1rem] font-bold cursor-pointer">
                {rcUpdate.rating}
              </p>
            </div>
            <p className="py-2 px-2 text-xl font-medium hover:text-yellow-500 group-hover:cursor-pointer transition-all duration-300">
              {rcUpdate.title}
            </p>
            <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[2.45vh]">
              {rcUpdate.genres.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default index;
