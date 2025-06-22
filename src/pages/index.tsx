// src/pages/index.tsx
import { useEffect, useState } from "react";
import PublicLayout from "@/Layouts/PublicLayout";
import { IoBookmarkOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const Index = () => {
  type Movie = {
    title: string;
    genres: string[];
    rating: number;
    image: string;
    source?: string; // optional because not all movies have source
  };

  const movies = [
    { 
      videoId : "vidId001", 
      title: "The Edge of Tomorrow",
      genres: ["Action", "Thriller"],
      rating: 7.8,
      image: "/Images/HomePageImg/img1.jpg",
      source: "/videos/input1/master.m3u8", // updated
    },
    { 
      videoId : "vidId002", 
      title: "Benched",
      genres: ["Comedy"],
      rating: 7.8,
      image: "/Images/HomePageImg/img2.jpg",
      source: "/videos/input2/master.m3u8", // updated
    },
    { 
      videoId : "vidId003",
      title: "Green Hell",
      genres: ["Romance", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img3.jpg",
      source: "/videos/input3/master.m3u8"
    },
    { 
      videoId : "vidId004",
      title: "Survival Spliton",
      genres: ["Comedy", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img4.jpg",
    },
    { 
      videoId : "vidId005",
      title: "The Chebod",
      genres: ["Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img5.jpg",
    },
    { 
      videoId : "vidId006",
      title: "Green Hell",
      genres: ["Romance", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img3.jpg",
    },
    { 
      videoId : "vidId007",
      title: "Survival Spliton",
      genres: ["Comedy", "Drama"],
      rating: 7.8,
      image: "/Images/HomePageImg/img4.jpg",
    },
    { 
      videoId : "vidId008",
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

  // Video Settings
  const handleMovieClick = (movie: {title: string; source?:string; videoId:string}) => {
     if (movie.source) {
      router.push({
        pathname: "/watch",
        query: {
          title: movie.title,
          source: movie.source,
          videoId: movie.videoId
        },
      });
    } else {
      alert("Sorry, video source not available for this movie.");
    }
  }
  const router = useRouter()

  // Theme According to state
  const [userState, setUserState] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`/api/get-location?lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        setUserState(data.state);
      });
    }
  }, []);


  
return (
  <PublicLayout>
  <div className="flex flex-col pr-3 overflow-x-hidden">
    <div className="main-container w-full max-w-full sm:px-2">
      {/* Header Content */}
      <h1 className="text-[22px] font-bold md:text-[40px] sm:text-[30px] md:font-medium lg:text-[42px] tracking-tighter lg:font-[400]">
        NEW ITEMS{" "}
        <span className="text-[22px] font-[300] sm:text-[30px] md:text-[35px] lg:text-[42px] lg:font-[200]">
          OF THIS SEASON
        </span>
      </h1>

      {/* Horizontal Scrollable Section for Cards */}
      <div className="mt-5 w-full overflow-x-auto hide-scrollbar">
        <div className="flex gap-6 md:gap-6 sm:gap-2 w-max">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[30vw] sm:w-[30vw] lg:w-[18.45vw] min-h-[18vh] sm:min-h-[35vh] lg:min-h-[40vh] rounded-lg pb-3 group snap-center"
               onClick={() => handleMovieClick(movie)}
            >
              <div className="w-full rounded-sm relative h-[90px] sm:h-[250px] lg:h-[300px]">
                <img
                  src={movie.image}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-fill"
                />
                <p className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-transparent border-2 md:border border-green-400 absolute top-2 sm:top-4 left-4 sm:left-5 z-10 md:flex items-center justify-center text-white text-[1.45rem] sm:text-[1.1rem] font-bold cursor-pointer hidden">
                  {movie.rating}
                </p>
                <p className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-black absolute top-2 sm:top-4 right-2 sm:right-5 z-10 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center text-white text-[0.9rem] sm:text-[1.1rem] font-bold transition-all duration-300">
                  <IoBookmarkOutline className="text-xl sm:text-2xl cursor-pointer" />
                </p>
                {/* Play Button */}
                <img
                  src="/Images/HomePageImg/play.png"
                  alt=""
                  className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 w-5 h-5 md:w-10 md:h-10 sm:w-12 sm:h-12 scale-50 group-hover:scale-100"
                />
              </div>
              <p className="py-1 sm:py-2 px-2 text-base tracking-wide leading-5 sm:text-lg lg:text-xl font-semibold hover:text-yellow-500 group-hover:cursor-pointer transition-all duration-300">
                {movie.title}
              </p>
              <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline font-medium text-[0.8rem] sm:text-[2.3vh] lg:text-[2.45vh]">
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

    {/* {selectedVideo?.source && (
      <>
        <p className="mt-4 mb-2 font-semibold">Now playing: {selectedVideo.title}</p>
        <VideoPlayer src={selectedVideo.source} />
      </>
    )} */} {/* ab iss line ki zarurat isliye nahi hai kyuki hum new route me karva rhe hai saara kaam video playing ka */}

    {/* Recently Updated Section */}
    <div className="main-container w-full max-w-full mx-auto sm:px-2 sm:mt-4 pb-3 overflow-x-hidden">
      <h1 className="font-medium text-xl sm:text-3xl lg:text-4xl">
        Recently Updated
      </h1>

      <div className="menu flex gap-4 sm:gap-8 lg:gap-16 mt-3 sm:mt-6">
        {Object.keys(tabData).map((tab: any) => (
          <p
            key={tab}
            className={`text-[1em] font-base sm:text-[2vh] lg:text-[2.45vh] pb-2 sm:pb-4 border-b-2 ${
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

      <div className="content mt-5 sm:mt-6">
        <div className="w-[30vw] sm:w-[30vw] lg:w-[15.45vw] min-h-[18vh] sm:min-h-[35vh] lg:min-h-[35vh] rounded-lg pb-3 group flex-shrink-0 snap-center">
          <div className="w-full rounded-sm relative h-[90px] sm:h-[250px] lg:h-[280px]">
            <img
              src={rcUpdate.image}
              alt={rcUpdate.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <p className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-transparent border-2 md:border border-green-400 absolute top-2 sm:top-4 left-2 sm:left-5 z-10 hidden md:flex items-center justify-center text-white text-[1.45rem] sm:text-[1.1rem] font-bold cursor-pointer">
              {rcUpdate.rating}
            </p>
          </div>
          <p className="py-1 sm:py-2 px-2 text-[0.9rem] leading-tight tracking-tight sm:text-lg lg:text-xl font-base hover:text-yellow-500 group-hover:cursor-pointer transition-all duration-300">
            {rcUpdate.title}
          </p>
          <p className="px-2 hover:cursor-pointer text-yellow-500 hover:underline text-[0.8rem] font-base sm:text-[2vh] lg:text-[2.45vh]">
            {rcUpdate.genres.join(", ")}
          </p>
        </div>
      </div>
    </div>
  </div>
</PublicLayout>

);
};

export default Index;

























