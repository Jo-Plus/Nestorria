import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/data.js";
import axios from "axios";
import toast from "react-hot-toast";

const AgencyReg = () => {
  const { setShowAgencyReg, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false); 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (typeof getToken !== 'function') {
        toast.error("Authentication utility is not ready");
        return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

      const { data } = await axios.post(
        `${backendUrl}/api/agencies`,
        { name, email, contact, address, city },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowAgencyReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Connection error with server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowAgencyReg(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="flex bg-white rounded-2xl max-w-4xl w-[95%] md:w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 relative"
      >
        <div className="hidden md:block w-1/2 relative">
          <img
            src={assets.createPrp}
            alt="createPrp"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 p-10 lg:p-12 bg-white">
          <button
            type="button"
            onClick={() => setShowAgencyReg(false)}
            className="absolute top-5 right-5 h-9 w-9 flexCenter bg-[#FFD700] hover:bg-[#ffc400] rounded-full shadow-lg transition-transform hover:scale-110 active:scale-90 z-10"
          >
            <img src={assets.close} alt="close" className="h-4 w-4" />
          </button>

          <div className="mb-8">
            <h3 className="h3 text-slate-800 mb-2">Register Agency</h3>
            <p className="text-gray-500 text-sm">
              Fill in the details to list your agency with Nestorria.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Agency Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                  required
                  placeholder="Nestorria Agency"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Contact</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                  required
                  placeholder="+123456789"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                required
                placeholder="agency@example.com"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                required
                placeholder="123 Street Name"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Location City</label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select City</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Dubai">Dubai</option>
                  <option value="London">London</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-dark w-full py-4 mt-4 rounded-xl shadow-lg transition-all duration-200 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgencyReg;