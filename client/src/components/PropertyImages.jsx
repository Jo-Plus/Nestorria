import React, { useState } from "react";

const PropertyImages = ({ property }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const imagesList = Array.isArray(property.images[0])
    ? property.images[0]
    : property.images;

  const imageCaptions = [
    {
      heading: "Front View",
      desc: "Experience a stunning first impression with elegant curb appeal.",
    },
    {
      heading: "Living Area",
      desc: "Spacious interiors designed for comfort and style.",
    },
    {
      heading: "Master Bedroom",
      desc: "A private retreat featuring comfort, light, and relaxation.",
    },
    {
      heading: "Modern Kitchen",
      desc: "Fully equipped kitchen with sleek finishes and modern appliances.",
    },
  ];

  return (
    <div className="flex max-sm:gap-1 max-md:gap-3 gap-5 h-[400px] w-full">
      {imagesList.map((pImg, index) => {
        const caption = imageCaptions[index] || {
          heading: "Property",
          desc: "View detail",
        };
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(index)}
            className={`relative group transition-all duration-500 h-[400px] overflow-hidden rounded-2xl ${
              isHovered ? "flex-grow w-full" : "max-sm:w-10 max-md:w-20 w-16"
            }`}
          >
            <img
              src={pImg}
              alt="property"
              className="h-full w-full object-cover object-center rounded-2xl"
            />

            <div
              className={`absolute inset-0 flex flex-col justify-end text-white p-10 bg-black/40 transition-all duration-300 rounded-2xl ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="h3">{caption.heading}</h3>
              <p className="text-white/90">{caption.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyImages;
