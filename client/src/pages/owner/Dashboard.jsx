import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets, dummyDashboardData } from "../../assets/data.js";

const Dashboard = () => {
  const { usr, currency } = useAppContext();

  const [dashboarData, setDashboarData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const getDashboardData = async () => {
    setDashboarData(dummyDashboardData);
  };

  useEffect(() => {
    getDashboardData();
  }, [usr]);

  return (
    <div className="space-y-8">
      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-6 p-6 bg-[#fff4d2] rounded-xl shadow-sm">
          <img src={assets.house} alt="house" className="hidden sm:block w-8" />
          <div>
            <h4 className="h4">
              {dashboarData.totalBookings.toString().padStart(2, "0")}
            </h4>
            <p className="text-secondary text-sm">Total Sales</p>
          </div>
        </div>

        <div className="flex items-center gap-6 p-6 bg-[#d1e8ff] rounded-xl shadow-sm">
          <img src={assets.dollar} alt="dollar" className="hidden sm:block w-8" />
          <div>
            <h4 className="h4">
              {currency}{dashboarData.totalRevenue}
            </h4>
            <p className="text-secondary text-sm">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* latest bookings */}
      {/* أضفنا overflow-x-auto هنا للسماح بالتمرير الأفقي */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          {/* أعطينا الجدول min-w لضمان عدم انضغاطه في الشاشات الصغيرة */}
          <div className="min-w-[800px]">
            {/* header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-secondary/90 text-sm font-semibold text-white">
              <span>Index</span>
              <span>Property</span>
              <span>Dates</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {/* rows */}
            <div className="divide-y bg-[#FFFCF2]">
              {dashboarData.bookings.map((booking, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 px-6 py-4 items-center text-sm hover:bg-slate-50 transition-colors"
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

                  <span className="text-slate-600">
                    {new Date(booking.checkInDate).toLocaleDateString()} –{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </span>

                  <span className="font-semibold text-slate-800">
                    {currency}{booking.totalPrice}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase w-fit
                      ${booking.isPaid
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
      </div>
    </div>
  );
};

export default Dashboard;