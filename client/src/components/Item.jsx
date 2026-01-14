// import React from "react";
// import { Link } from "react-router-dom";
// import { assets } from "../assets/data.js";

// const Item = ({ property }) => {
//   return <Link to={`/listing/` + property._id} className="block rounded-lg bg-white ring-1 ring-slate-900/5">
//     {/* image */}
//     <div className="relative">
//       <img src={property.images[0]} alt={property.title} className="h-[13rem] w-full aspect-square object-cover rounded-t-xl" />
//     </div>
//     {/* info */}
//     <div className="p-3">
//       <div className="flexBetween">
//         <h5 className="bold-16 my-1">
//           {property.propertyType}
//         </h5>
//         <div className="bold-15 text-secondary">${property.price.sale} | ${property.price.rent}.00 <span className="text-xs">/night</span></div>
//       </div>
//         <h4 className="h4 line-clamp-1">{property.title}</h4>
//         <div className="flexCenter gap-4 py-2">
//           <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
//             <img src={assets.bed} alt="bed" width={21} />
//             {property.facilities.bedrooms}
//           </p>
//           <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
//             <img src={assets.bath} alt="bed" width={21} />
//             {property.facilities.bathrooms}
//           </p>
//           <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
//             <img src={assets.car} alt="bed" width={21} />
//             {property.facilities.garages}
//           </p>
//           <p className="flexCenter gap-x-2 pr-4 font-[500]">
//             <img src={assets.ruler} alt="bed" width={21} />
//             {property.area}
//           </p>
//         </div>
//         <p className="rt-2 mb-4 line-clamp-2">{property.description}</p>
//     </div>
//   </Link>;
// };

// export default Item;


import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/data.js";
import { useAppContext } from "../context/AppContext.jsx";

const Item = ({ property }) => {
  const {currency} = useAppContext();
  return (
    <Link
      to={`/listing/${property._id}`}
      className="group block rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-[11rem] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold uppercase tracking-wider text-slate-800">
            {property.propertyType}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-tighter">Price</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-secondary">{currency}{property.price.sale}</span>
              <span className="text-slate-300">|</span>
              <span className="text-sm font-semibold text-slate-600">
                {currency}{property.price.rent}.00<span className="text-[10px]">/night</span>
              </span>
            </div>
          </div>
        </div>
        <h4 className="text-xl font-bold text-slate-800 line-clamp-1 mb-2 group-hover:text-secondary transition-colors italic">
          {property.title}
        </h4>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {property.description}
        </p>
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100">
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={assets.bed} alt="bed" className="w-5 h-5 opacity-70" />
            <span className="text-xs font-bold text-slate-700">{property.facilities.bedrooms}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-1 border-x border-slate-100">
            <img src={assets.bath} alt="bath" className="w-5 h-5 opacity-70" />
            <span className="text-xs font-bold text-slate-700">{property.facilities.bathrooms}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 border-r border-slate-100">
            <img src={assets.car} alt="garage" className="w-5 h-5 opacity-70" />
            <span className="text-xs font-bold text-slate-700">{property.facilities.garages}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <img src={assets.ruler} alt="area" className="w-5 h-5 opacity-70" />
            <span className="text-[10px] font-bold text-slate-700 truncate">{property.area}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;