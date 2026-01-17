import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/data.js";
import toast from "react-hot-toast";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { currency, user, getToken } = useAppContext();

  const getUserBooking = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUserBooking();
    }
  }, [user]);

  return (
    <div className="max-padd-container bg-gradient-to-r from-[#fffbee] to-white py-16 pt-28 min-h-screen">
      <h3 className="h3 mb-8">My Bookings</h3>

      <div className="flex flex-col gap-6">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white ring-1 ring-slate-900/5 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6 mb-4">
                <img
                  src={booking.property.images[0][0]}
                  alt="property"
                  className="h-24 w-full sm:w-40 object-cover rounded-xl"
                />

                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h5 className="bold-18 capitalize line-clamp-1 mb-1">
                      {booking.property.title}
                    </h5>
                    <p className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                      <img src={assets.pin} width={14} alt="pin" />
                      {booking.property.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    <div className="flex items-center gap-x-2">
                      <span className="medium-14 text-gray-700">Guests:</span>
                      <span className="text-sm bg-slate-100 px-2 py-0.5 rounded">
                        {booking.guests} People
                      </span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <span className="medium-14 text-gray-700">
                        Total Price:
                      </span>
                      <span className="bold-16 text-secondary">
                        {currency}
                        {booking.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-4 mt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Booking ID
                  </span>
                  <p className="text-sm font-mono text-slate-600 truncate">
                    {booking._id}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Check-In
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Check-Out
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                </div>
              </div>

              <div className="flexBetween mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-x-3">
                  <h5 className="medium-14">Payment Status:</h5>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs capitalize ${
                      booking.isPaid
                        ? "bg-green-50 text-green-600 ring-1 ring-green-500/20"
                        : "bg-yellow-50 text-yellow-600 ring-1 ring-yellow-500/20"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-yellow-500"}`}
                    />
                    {booking.isPaid ? "Paid" : "Unpaid"}
                  </div>
                </div>

                {!booking.isPaid && (
                  <button className="btn-secondary !py-2 px-6 rounded-lg text-sm transition-transform active:scale-95">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
            <p className="text-gray-400">No bookings found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
