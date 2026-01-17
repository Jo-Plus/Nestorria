import React, { useState } from "react";
import { assets, cities } from "../assets/data.js";
import { useAppContext } from "../context/AppContext.jsx";

const Hero = () => {
  const { navigate, getToken, searchQuery, setSearchQuery } = useAppContext();
  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();

    if (!destination) return;

    setSearchQuery(destination);

    navigate(`/listing?destination=${destination}`);

    try {
      const token = await getToken();
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/store-recent-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ recentSearchedCity: destination }),
        }
      );
    } catch (error) {
      console.error("Error storing recent search:", error);
    }
  };

  return (
    <section className="h-screen w-screen bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="max-padd-container h-screen">
        <div className="absolute inset-0 bg-black/10 z-0" />

        <div className="relative flex justify-end mx-auto flex-col gap-4 h-full py-6 sm:pt-18 z-10">
          <div className="text-white flex flex-col mt-12">
            <button className="max-w-80 flex items-center space-x-3 border border-white medium-13 rounded-full px-4 pr-0.5 py-1 cursor-pointer">
              <span>Explore how we simplify stays and spaces</span>
              <span className="flexCenter size-6 p-1 rounded-full bg-white">
                <img src={assets.right} alt="right" width={20} />
              </span>
            </button>
            <h2 className="h2 capitalize leading-tight mt-3 my-2 text-white">
              Explore{" "}
              <span className="bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent">
                exceptional properties
              </span>{" "}
              located in stunning surroundings.
            </h2>
          </div>

          <form
            className="bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col lg:flex-row gap-4 lg:gap-x-8 max-w-md lg:max-w-full ring-1 ring-slate-900/5 relative"
            onSubmit={onSearch}
          >
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.pin} alt="pin" width={20} />
                <label htmlFor="destinationInput">Destination</label>
              </div>
              <input
                type="text"
                list="destinations"
                id="destinationInput"
                placeholder="Type Here..."
                className="rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
              <datalist id="destinations">
                {cities.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.calendar} alt="calendar" width={20} />
                <label htmlFor="checkIn">Check in</label>
              </div>
              <input
                type="date"
                id="checkIn"
                className="rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.calendar} alt="calendar" width={20} />
                <label htmlFor="checkOut">Check out</label>
              </div>
              <input
                type="date"
                id="checkOut"
                className="rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.user} alt="user" width={20} />
                <label htmlFor="guests">Guests</label>
              </div>
              <input
                min={1}
                max={5}
                type="number"
                id="guests"
                className="rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
                placeholder="0"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-md bg-black py-3 px-6 text-white my-auto cursor-pointer max-md:w-full max-md:py-2 hover:bg-slate-800 transition-all"
            >
              <img
                src={assets.search}
                alt="search"
                width={20}
                className="invert"
              />
              <span className="font-medium">Search</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
