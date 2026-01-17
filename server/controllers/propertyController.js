import { v2 as cloudinary } from "cloudinary";
import Agency from "../models/Agency.js";
import Property from "../models/property.js";

export const createNewProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      country,
      address,
      area,
      propertyType,
      priceRent,
      priceSale,
      bedrooms,
      bathrooms,
      garages,
      amenities,
    } = req.body;

    const userId = req.user._id;

    const agency = await Agency.findOne({ userId: userId });

    if (!agency) {
      console.log("Searching for Agency with userId:", userId);
      return res.status(404).json({
        success: false,
        message: "Agency not found. Please create an agency profile first.",
      });
    }

const uploadImages = req.files.map(async (file) => {
  const response = await cloudinary.uploader.upload(file.path);
  return response.secure_url;
});

const images = await Promise.all(uploadImages);

const propertyData = {
  agency: agency._id,
  title,
  description,
  city,
  country,
  address,
  area: Number(area),
  propertyType,
  price: {
    rent: Number(priceRent) || 0,
    sale: Number(priceSale) || 0,
  },
  facilities: {
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    garages: Number(garages),
  },
  images: images,
  amenities: JSON.parse(amenities),
};

    const newProperty = new Property(propertyData);
    await newProperty.save();

    res
      .status(201)
      .json({ success: true, message: "Property Created Successfully" });
  } catch (error) {
    console.error("Error in createNewProperty:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllAvailableProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isAvailable: true }).populate({
      path: "agency",
      populate: {
        path: "userId",
        select: "image email name",
      },
    });

    res.json({ success: true, properties });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerProperties = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User information not found.",
      });
    }

    const currentUserId = req.user._id;

    const agencyData = await Agency.findOne({ userId: currentUserId });

    if (!agencyData) {
      return res.status(404).json({
        success: false,
        message: "Agency not found. Please register your agency profile first.",
      });
    }

    const properties = await Property.find({ agency: agencyData._id });

    res.json({ success: true, properties });
  } catch (error) {
    console.error("Error in getOwnerProperties:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePropertyAvailability = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const propertyData = await Property.findById(propertyId);

    if (!propertyData) {
      return res.json({ success: false, message: "Property not found" });
    }

    propertyData.isAvailable = !propertyData.isAvailable;
    await propertyData.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
