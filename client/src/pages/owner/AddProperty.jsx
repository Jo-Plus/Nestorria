import React, { useState } from "react";
import { assets } from "../../assets/data.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";

const AddProperty = () => {
  const { getToken } = useAppContext();
  const navigate = useNavigate();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    address: "",
    area: "",
    propertyType: "",
    priceRent: "",
    priceSale: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    amenities: {
      Parking: false,
      Wifi: false,
      Backyard: false,
      Terrace: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.title.trim() ||
      !inputs.description.trim() ||
      !inputs.city.trim() ||
      !inputs.country.trim() ||
      !inputs.address.trim() ||
      !inputs.propertyType ||
      inputs.area === "" ||
      inputs.bedrooms === "" ||
      inputs.bathrooms === "" ||
      (!inputs.priceRent && !inputs.priceSale)
    ) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const hasImage = Object.values(images).some((img) => img !== null);
    if (!hasImage) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("city", inputs.city);
      formData.append("country", inputs.country);
      formData.append("address", inputs.address);
      formData.append("area", Number(inputs.area));
      formData.append("propertyType", inputs.propertyType);
      formData.append(
        "priceRent",
        inputs.priceRent ? Number(inputs.priceRent) : 0
      );
      formData.append(
        "priceSale",
        inputs.priceSale ? Number(inputs.priceSale) : 0
      );
      formData.append("bedrooms", Number(inputs.bedrooms));
      formData.append("bathrooms", Number(inputs.bathrooms));
      formData.append("garages", Number(inputs.garages));

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.values(images).forEach((img) => {
        if (img) {
          formData.append("images", img);
        }
      });

      const token = await getToken();

      const { data } = await axios.post("/api/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success("Property added successfully");

        setInputs({
          title: "",
          description: "",
          city: "",
          country: "",
          address: "",
          area: "",
          propertyType: "",
          priceRent: "",
          priceSale: "",
          bedrooms: "",
          bathrooms: "",
          garages: "",
          amenities: {
            Parking: false,
            Wifi: false,
            Backyard: false,
            Terrace: false,
          },
        });

        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });

        navigate("/owner/list-property");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pb-10">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-6 px-2 text-sm xl:max-w-4xl"
      >
        <div className="space-y-4">
          <div className="w-full">
            <h5 className="h5 mb-1 font-semibold text-gray-700">
              Property Name
            </h5>
            <input
              name="title"
              type="text"
              placeholder="Modern Villa in Downtown"
              className="px-4 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none focus:ring-secondary/20 transition-all"
              onChange={handleChange}
              value={inputs.title}
            />
          </div>

          <div className="w-full">
            <h5 className="h5 mb-1 font-semibold text-gray-700">
              Property Description
            </h5>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe the beauty of this place..."
              className="px-4 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none focus:ring-secondary/20 transition-all resize-none"
              onChange={handleChange}
              value={inputs.description}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            <h5 className="h5 mb-1 font-semibold text-gray-700">City</h5>
            <input
              name="city"
              type="text"
              placeholder="New York"
              className="px-4 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.city}
            />
          </div>
          <div className="w-full">
            <h5 className="h5 mb-1 font-semibold text-gray-700">Country</h5>
            <input
              name="country"
              type="text"
              placeholder="USA"
              className="px-4 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.country}
            />
          </div>
          <div className="w-full">
            <h5 className="h5 mb-1 font-semibold text-gray-700">
              Property Type
            </h5>
            <select
              name="propertyType"
              className="w-full px-4 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 outline-none cursor-pointer"
              onChange={handleChange}
              value={inputs.propertyType}
            >
              <option value="">Select Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
              <option value="Land Plot">Land Plot</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <h5 className="h5 mb-1 font-semibold text-gray-700">Address</h5>
            <input
              name="address"
              type="text"
              placeholder="Street 123, Building A"
              className="px-4 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.address}
            />
          </div>
          <div>
            <h5 className="h5 mb-1 font-semibold text-gray-700">
              Area (sq ft)
            </h5>
            <input
              name="area"
              type="number"
              placeholder="2500"
              className="px-4 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.area}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <h5 className="h5 mb-1 font-semibold text-gray-700 text-xs truncate">
              Rent Price <span className="text-[10px] opacity-60">/night</span>
            </h5>
            <input
              name="priceRent"
              type="number"
              min={0}
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.priceRent}
            />
          </div>
          <div>
            <h5 className="h5 mb-1 font-semibold text-gray-700 text-xs">
              Sale Price
            </h5>
            <input
              name="priceSale"
              type="number"
              min={0}
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.priceSale}
            />
          </div>
          <div>
            <h5 className="h5 mb-1 font-semibold text-gray-700 text-xs">
              Bedrooms
            </h5>
            <input
              name="bedrooms"
              type="number"
              min={0}
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.bedrooms}
            />
          </div>
          <div>
            <h5 className="h5 mb-1 font-semibold text-gray-700 text-xs">
              Bathrooms
            </h5>
            <input
              name="bathrooms"
              type="number"
              min={0}
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.bathrooms}
            />
          </div>
          <div>
            <h5 className="h5 mb-1 font-semibold text-gray-700 text-xs">
              Garages
            </h5>
            <input
              name="garages"
              type="number"
              min={0}
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-secondary/5 mt-1 w-full outline-none"
              onChange={handleChange}
              value={inputs.garages}
            />
          </div>
        </div>

        <div className="p-4 bg-secondary/5 rounded-2xl border border-slate-900/5">
          <h5 className="h5 mb-3 font-bold text-gray-800">
            Available Amenities
          </h5>
          <div className="flex gap-6 flex-wrap mt-1">
            {Object.keys(inputs.amenities).map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  id={`amenity-${amenity}`}
                  type="checkbox"
                  className="w-4 h-4 accent-secondary cursor-pointer"
                  onChange={() =>
                    setInputs({
                      ...inputs,
                      amenities: {
                        ...inputs.amenities,
                        [amenity]: !inputs.amenities[amenity],
                      },
                    })
                  }
                  checked={inputs.amenities[amenity]}
                />
                <label
                  htmlFor={`amenity-${amenity}`}
                  className="cursor-pointer font-medium text-gray-600 uppercase text-[12px] tracking-wider"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="h5 mb-3 font-semibold text-gray-700">
            Property Images
          </h5>
          <div className="flex gap-4 flex-wrap">
            {Object.keys(images).map((key) => (
              <label
                key={key}
                htmlFor={`propertyImage${key}`}
                className="ring-1 ring-slate-900/10 overflow-hidden rounded-2xl cursor-pointer hover:ring-secondary/30 transition-all bg-white shadow-sm"
              >
                <input
                  onChange={(e) =>
                    setImages({ ...images, [key]: e.target.files[0] })
                  }
                  type="file"
                  accept="image/*"
                  id={`propertyImage${key}`}
                  hidden
                />
                <div className="h-24 w-28 md:w-36 bg-secondary/5 flex items-center justify-center overflow-hidden">
                  {images[key] ? (
                    <img
                      src={URL.createObjectURL(images[key])}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 opacity-40">
                      <img
                        src={assets.uploadIcon}
                        alt="upload"
                        className="w-10 h-15"
                      />
                      <span className="text-[10px] font-bold">IMAGE {key}</span>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-secondary text-white py-3 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20"
        >
          {loading ? "Adding Property..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
