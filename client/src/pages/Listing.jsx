import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import Item from "../components/Item.jsx";

const Listing = () => {
  const [selectedSort, setSelectedSort] = useState("Relevant");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const { properties = [], searchQuery } = useAppContext();
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    let temp = [...properties];

    if (searchQuery) {
      temp = temp.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.propertyType?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      temp = temp.filter((p) => selectedTypes.includes(p.propertyType));
    }

    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      temp = temp.filter((p) => {
        const price = p.price?.sale || p.price?.rent || 0;
        return price >= min && price <= max;
      });
    }

    if (selectedSort === "Low to High") {
      temp.sort((a, b) => (a.price?.sale || 0) - (b.price?.sale || 0));
    } else if (selectedSort === "High to Low") {
      temp.sort((a, b) => (b.price?.sale || 0) - (a.price?.sale || 0));
    }

    setFilteredProperties(temp);
  }, [properties, searchQuery, selectedTypes, selectedPrice, selectedSort]);

  return (
    <div className="bg-gradient-to-r from-[#fffbee] to-white pt-28 pb-12 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Sidebar filters */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-[#FFF9E5] p-8 rounded-3xl h-fit shadow-sm">
          <div className="mb-10">
            <h5 className="font-bold text-gray-800 mb-4 text-xl">Sort By</h5>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full p-3 bg-white border border-orange-100 rounded-xl outline-none text-gray-700 cursor-pointer shadow-sm focus:ring-2 focus:ring-orange-300"
            >
              {["Relevant", "Low to High", "High to Low"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-10">
            <h5 className="font-bold text-gray-800 mb-5 text-xl">
              Property Type
            </h5>
            <div className="flex flex-col gap-4">
              {[
                "House",
                "Apartment",
                "Villa",
                "Penthouse",
                "Townhouse",
                "Commercial",
                "Land Plot",
              ].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-orange-500 rounded border-gray-300"
                    onChange={() =>
                      setSelectedTypes((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      )
                    }
                  />
                  <span className="text-gray-600 group-hover:text-black font-medium transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-gray-800 mb-5 text-xl">
              Price Range
            </h5>
            <div className="flex flex-col gap-4">
              {[
                { label: "$0 to 10000", value: "0-10000" },
                { label: "$10000 to 20000", value: "10000-20000" },
                { label: "$20000 to 40000", value: "20000-40000" },
                { label: "$40000 to 80000", value: "40000-80000" },
              ].map((price) => (
                <label
                  key={price.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    name="price"
                    className="w-5 h-5 accent-orange-500"
                    onChange={() => setSelectedPrice(price.value)}
                  />
                  <span className="text-gray-600 group-hover:text-black font-medium transition-colors">
                    {price.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {filteredProperties.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <Item key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl text-gray-500 font-medium">
                No matches found.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Listing;
