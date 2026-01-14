import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { dummyProperties } from "../../assets/data.js";
import { assets } from "../../assets/data.js"; 

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const { user, currency } = useAppContext();

  const getProperties = async () => {
    setProperties(dummyProperties);
  };

  useEffect(() => {
    if (user) {
      getProperties();
    }
  }, [user]);

  const handleEdit = (id) => console.log("Edit property:", id);
  const handleDelete = (id) => console.log("Delete property:", id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-900/10 overflow-hidden">
      
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          
          {/* Header */}
          <div className="grid grid-cols-[0.6fr_2.5fr_2fr_1.2fr_1.2fr_1fr] gap-4 px-6 py-5 bg-secondary/90 text-white text-sm font-bold uppercase tracking-widest">
            <h5>#</h5>
            <h5>Property</h5>
            <h5>Address</h5>
            <h5>Price</h5>
            <h5 className="text-center">Status</h5>
            <h5 className="text-center">Action</h5>
          </div>

          <div className="divide-y divide-slate-900/10 bg-[#FFFCF2]">
            {properties.map((property, index) => (
              <div
                key={index}
                className="grid grid-cols-[0.6fr_2.5fr_2fr_1.2fr_1.2fr_1fr] gap-4 px-6 py-5 items-center text-sm hover:bg-secondary/5 transition-all duration-200"
              >
                <span className="font-medium text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-4">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-14 h-10 object-cover rounded-lg shadow-sm"
                  />
                  <span className="font-bold text-slate-800 line-clamp-1">
                    {property.title}
                  </span>
                </div>

                <span className="text-slate-600 line-clamp-1 pr-4">
                  {property.address}
                </span>

                <span className="font-extrabold text-slate-900">
                  {currency}{Number(property.price.sale || property.price.rent).toLocaleString()}
                </span>

                <div className="flex justify-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={property.isAvailable}
                    />
                    <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button 
                    onClick={() => handleEdit(property._id)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    title="Edit Property"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => handleDelete(property._id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Delete Property"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;