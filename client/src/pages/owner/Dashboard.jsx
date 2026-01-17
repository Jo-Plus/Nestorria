import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/data.js";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, currency, getToken } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const getDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/bookings/agency", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  useEffect(() => {
    if (user) getDashboardData();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-6 p-6 bg-[#fff4d2] rounded-xl shadow-sm">
          <img src={assets.house} alt="house" className="w-8" />
          <div>
            <h4 className="h4">
              {dashboardData?.totalBookings?.toString().padStart(2, "0")}
            </h4>
            <p className="text-secondary text-sm">Total Sales</p>
          </div>
        </div>

        <div className="flex items-center gap-6 p-6 bg-[#d1e8ff] rounded-xl shadow-sm">
          <img src={assets.dollar} alt="dollar" className="w-8" />
          <div>
            <h4 className="h4">
              {currency}
              {dashboardData?.totalRevenue || 0}
            </h4>
            <p className="text-secondary text-sm">Total Earnings</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div
          className="
            grid
            grid-cols-[44px_1.8fr_2.2fr_1.2fr_1.2fr]
            sm:grid-cols-5
            gap-4
            px-6
            py-4
            bg-secondary/90
            text-sm
            font-semibold
            text-white
            rounded-2xl
          "
        >
          <span>Index</span>
          <span>Property</span>
          <span>Dates</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        <div className="divide-y bg-[#FFFCF2]">
          {dashboardData.bookings.map((booking, index) => (
            <div
              key={index}
              className="
                grid
                grid-cols-[44px_1.8fr_2.2fr_1.2fr_1.2fr]
                sm:grid-cols-5
                gap-4
                px-6
                py-4
                items-center
                text-sm
                hover:bg-slate-50
                transition-colors
              "
            >
              <span className="text-slate-500 font-medium">#{index + 1}</span>

              <div className="flex items-center gap-3">
                <img
                  src={booking.property.images[0]}
                  alt={booking.property.title}
                  className="w-12 h-9 object-cover rounded-md"
                />
                <span className="line-clamp-2 font-medium">
                  {booking.property.title}
                </span>
              </div>

              <span className="text-slate-600 leading-tight">
                {new Date(booking.checkInDate).toLocaleDateString()} –{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </span>

              <span className="font-semibold text-slate-800">
                {currency}
                {booking.totalPrice}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase w-fit
                  ${
                    booking.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {booking.isPaid ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
