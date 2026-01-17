import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import axios from "axios";

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, currency, getToken } = useAppContext();

  const getProperties = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get("/api/properties/owner", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProperties(data.properties || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (propertyId) => {
    const token = await getToken();
    const { data } = await axios.post(
      "/api/properties/toggle-availability",
      { propertyId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getProperties();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (user) getProperties();
  }, [user]);

  if (loading)
    return (
      <div className="p-10 text-center font-bold">Loading Properties...</div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-900/10 overflow-hidden">
      <div
        className="
          grid
          grid-cols-[32px_1.8fr_2fr_1fr_1fr_1fr]
          sm:grid-cols-[0.6fr_2.5fr_2fr_1.2fr_1.2fr_1fr]
          gap-4
          px-4 sm:px-6
          py-4 sm:py-5
          bg-secondary/90
          text-white
          text-[11px] sm:text-sm
          font-bold
          uppercase
          tracking-widest
        "
      >
        <h5>#</h5>
        <h5>Property</h5>
        <h5>Address</h5>
        <h5>Price</h5>
        <h5 className="text-center">Status</h5>
        <h5 className="text-center">Action</h5>
      </div>

      <div className="divide-y divide-slate-900/10 bg-[#FFFCF2]">
        {properties && properties.length > 0 ? (
          properties.map((property, index) => (
            <div
              key={property._id || index}
              className="
                grid
                grid-cols-[32px_1.8fr_2fr_1fr_1fr_1fr]
                sm:grid-cols-[0.6fr_2.5fr_2fr_1.2fr_1.2fr_1fr]
                gap-4
                px-4 sm:px-6
                py-4 sm:py-5
                items-center
                text-[11px] sm:text-sm
                hover:bg-secondary/5
                transition-all
                duration-200
              "
            >
              <span className="font-medium text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-3">
                <img
                  src={
                    property.images?.[0]?.[0] ||
                    "https://via.placeholder.com/150"
                  }
                  alt={property.title}
                  className="w-10 h-8 sm:w-14 sm:h-10 object-cover rounded-lg shadow-sm"
                />
                <span className="font-bold text-slate-800 line-clamp-1">
                  {property.title}
                </span>
              </div>

              <span className="text-slate-600 line-clamp-2 leading-tight pr-2">
                {property.address}
              </span>

              <span className="font-extrabold text-slate-900">
                {currency}
                {Number(
                  property.price?.sale || property.price?.rent || 0
                ).toLocaleString()}
              </span>

              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    onChange={() => toggleAvailability(property._id)}
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={property.isAvailable}
                  />
                  <div className="w-10 h-5 sm:w-11 sm:h-6 bg-slate-300 rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  ✏️
                </button>
                <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500 font-bold">
            No properties found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProperty;
