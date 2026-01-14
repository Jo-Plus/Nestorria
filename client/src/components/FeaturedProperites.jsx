import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/data.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/bundle';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useAppContext } from "../context/AppContext.jsx";
import Item from "./Item.jsx";

const FeaturedProperites = () => {
  const { properties } = useAppContext();
  console.log("Properties Data:", properties);
  if (!properties || properties.length === 0) {
    return <p>Loading properties...</p>;
  }
  return (
    <section className="max-padd-container py-16 xl:py-22">
      <span className="medium-18">Your New Home Awaits!</span>
      <h1 className="h2">Discover Your Place Here</h1>

      <div className="flexBetween mt-8 mb-6">
        <h5>
          <span className="font-bold">Displaying 1–9</span> from 3k listings
        </h5>

        <Link
          to="/listing"
          onClick={() => window.scrollTo(0, 0)}
          className="bg-secondary/10 ring-1 ring-slate-900/15 text-white text-2xl rounded-md p-2 flexCenter"
        >
          <img src={assets.sliders} alt="sliders" />
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          600: { slidesPerView: 2, spaceBetween: 30 },
          1124: { slidesPerView: 3, spaceBetween: 30 },
          1300: { slidesPerView: 4, spaceBetween: 30 },
        }}
        modules={[Autoplay]}
        className="h-[480px] md:h-[533px] xl:h-[422px] mt-5"
      >
        {properties.slice(0, 6).map((property, index) => (
          <SwiperSlide key={property._id}>
            <Item property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProperites;
