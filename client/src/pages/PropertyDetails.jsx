import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import PropertyImages from "../components/PropertyImages.jsx";
import { assets } from "../assets/data.js";
import axios from "axios";
import { toast } from "react-hot-toast";

const PropertyDetails = () => {
  const { properties, currency, getToken } = useAppContext();
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // --- States ---
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // --- Load property from context ---
  useEffect(() => {
    const foundProperty = properties.find((p) => p._id === id);
    foundProperty && setProperty(foundProperty);
  }, [properties, id]);

  // --- Check availability function ---
  const checkAvailability = async () => {
    try {
      if (!checkInDate || !checkOutDate) {
        return toast.error("Please select both check-in and check-out dates");
      }

      if (checkInDate > checkOutDate) {
        return toast.error("Check-in date must be before check-out date");
      }

      const token = await getToken();
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/check-availability`,
        {
          property: id,
          checkInDate,
          checkOutDate,
          guests: Number(guests),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success && data.isAvailable) {
        setIsAvailable(true);
        toast.success("Property is available! Click again to book.");
      } else {
        setIsAvailable(false);
        toast.error(data.message || "Property not available");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- Submit handler ---
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate || !guests) {
      return toast.error("Please fill all fields");
    }

    try {
      const token = await getToken();

      if (!isAvailable) {
        const { data: checkData } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings/check-availability`,
          { property: id, checkInDate, checkOutDate },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (checkData.success && checkData.isAvailable) {
          setIsAvailable(true);
          toast.success("Property is available! Processing your booking...");
        } else {
          return toast.error(checkData.message || "Property not available");
        }
      }

      const { data: bookingData } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/book`,
        {
          property: id,
          checkInDate,
          checkOutDate,
          guests: Number(guests),
          paymentMethod: "Pay at Check-in",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (bookingData.success) {
        toast.success(bookingData.message);
        setIsAvailable(false);
        navigate("/my-bookings");
        window.scrollTo(0, 0);
      } else {
        toast.error(bookingData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!property) return null;

  return (
    <div className="bg-gradient-to-r from-[#fffbee] to-white py-16 pt-28 min-h-screen">
      <div className="max-padd-container">
        <PropertyImages property={property} />

        <div className="flex flex-col xl:flex-row gap-8 mt-6">
          <div className="p-4 flex-[2] rounded-xl border border-slate-900/10">
            <p className="flexStart gap-x-2">
              <img src={assets.pin} alt="pin" width={19} />
              <span>{property.address}</span>
            </p>

            <div className="flex justify-between flex-col sm:flex-row sm:items-end mt-3">
              <h3 className="h3">{property.title}</h3>
              <div className="bold-18">
                {currency}
                {property.price.sale} | {currency}
                {property.price.rent}.00/night
              </div>
            </div>

            <div className="flex justify-between items-start my-1">
              <h4 className="h4 text-secondary">{property.propertyType}</h4>

              <div className="flex items-center gap-2 text-secondary relative top-1.5">
                <h4 className="bold-18 relative bottom-0.5 text-black">5.0</h4>
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={assets.star} alt="star" width={18} />
                ))}
              </div>
            </div>

            <div className="flex gap-x-4 mt-3">
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.bed} alt="bed" width={19} />
                {property.facilities.bedrooms}
              </p>
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.bath} alt="bath" width={19} />
                {property.facilities.bathrooms}
              </p>
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.car} alt="car" width={19} />
                {property.facilities.parkings || 1}
              </p>
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.ruler} alt="area" width={19} />
                400
              </p>
            </div>

            <div className="mt-6">
              <h4 className="h4 mt-4 mb-1">Property Details</h4>
              <p className="mb-4">{property.description}</p>
            </div>

            <h4 className="h4 mt-6 mb-2">Amenities</h4>
            <div className="flex gap-3">
              {property.amenities?.length > 0 ? (
                property.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="p-3 py-1 rounded-lg border border-slate-900/10 text-xs"
                  >
                    {amenity}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No amenities listed.</p>
              )}
            </div>

            {/* Form */}
            <form
              onSubmit={onSubmitHandler}
              className="text-gray-500 bg-secondary/10 rounded-lg px-6 py-4 flex flex-col lg:flex-row gap-4 lg:gap-x-8 max-w-md lg:max-w-full ring-1 ring-slate-900/5 relative mt-10"
            >
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <img src={assets.calendar} alt="calendar" width={20} />
                  <label htmlFor="checkInDate">Check in</label>
                </div>
                <input
                  type="date"
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(e) => {
                    setCheckInDate(e.target.value);
                    setIsAvailable(false);
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="rounded bg-secondary/10 border border-gray-200 px-3 mt-1.5 py-1.5 text-sm outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <img src={assets.calendar} alt="calendar" width={20} />
                  <label htmlFor="checkOutDate">Check out</label>
                </div>
                <input
                  type="date"
                  id="checkOutDate"
                  value={checkOutDate}
                  onChange={(e) => {
                    setCheckOutDate(e.target.value);
                    setIsAvailable(false);
                  }}
                  min={checkInDate}
                  required
                  className="rounded bg-secondary/10 border border-gray-200 px-3 mt-1.5 py-1.5 text-sm outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <img src={assets.user} alt="user" width={20} />
                  <label htmlFor="guests">Guests</label>
                </div>
                <input
                  type="number"
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min={1}
                  max={5}
                  required
                  className="rounded bg-secondary/10 border border-gray-200 px-3 mt-1.5 py-1.5 text-sm outline-none"
                  placeholder="0"
                />
              </div>
              <button
                type="submit"
                className="flexCenter gap-1 rounded-md btn-dark min-w-44 h-11 self-end"
              >
                <img
                  src={assets.search}
                  alt="search"
                  width={20}
                  className="invert"
                />
                <span>{isAvailable ? "Book Now" : "Check Dates"}</span>
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex-1 max-w-sm">
            <div className="p-6 rounded-lg border border-slate-900/10 sticky top-28">
              <h4 className="h4 mb-3">Contact Agent</h4>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="your Name"
                  className="p-2 py-1 border border-gray-300 rounded-md text-sm outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="your Email"
                  className="p-2 py-1 border border-gray-300 rounded-md text-sm outline-none"
                  required
                />
                <textarea
                  rows={4}
                  placeholder="your Message"
                  className="p-2 py-1 border border-gray-300 rounded-md text-sm resize-none outline-none"
                  required
                />
                <button
                  type="submit"
                  className="btn-secondary rounded-lg py-1.5"
                >
                  Send Message
                </button>
              </form>

              <h4 className="h4 mb-3 mt-8">For Buying Contact</h4>
              <div className="text-sm divide-y divide-gray-500/30 border border-gray-500/30 rounded">
                <div className="flex items-start justify-between p-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h5>{property.agency.name}</h5>
                      <p className="bg-green-500/20 px-2 py-0.5 rounded-full text-[10px] text-green-600 border border-green-500/30">
                        Agency
                      </p>
                    </div>
                    <p className="text-gray-500">Agency Office</p>
                  </div>
                  <img
                    src={property.agency?.owner?.image || assets.userImg}
                    alt="userImg"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>

                <div className="flexCenter gap-2 p-3">
                  <div className="bg-green-500/20 p-1.5 rounded-full border border-green-500/30">
                    <img src={assets.phone} alt="phone" width={14} />
                  </div>
                  <p>{property.agency.contact}</p>
                </div>

                <div className="flexCenter gap-2 p-3">
                  <div className="bg-green-500/20 p-1.5 rounded-full border border-green-500/30">
                    <img src={assets.phone} alt="phone" width={14} />
                  </div>
                  <p className="truncate">{property.agency.email}</p>
                </div>

                <div className="flex flex-center divide-x divide-gray-500/30">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer hover:bg-gray-50"
                  >
                    <img src={assets.mail} alt="email" width={19} />
                    <span className="text-xs">Send Email</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer hover:bg-gray-50"
                  >
                    <img src={assets.phone} alt="phone" width={19} />
                    <span className="text-xs">Call Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
