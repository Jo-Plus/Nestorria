import Booking from "../models/Booking.js";
import Property from "../models/property.js";
import Agency from "../models/Agency.js";
import transporter from "../config/nodemailer.js";

const checkAvailability = async ({ checkInDate, checkOutDate, property }) => {
  try {
    const bookings = await Booking.find({
      property,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};

export const checkBookingAvailability = async (req, res) => {
  try {
    const { property, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      property,
    });

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const bookingCreate = async (req, res) => {
  try {
    const { property, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      property,
    });
    if (!isAvailable) {
      return res.json({ success: false, message: "Property is not available" });
    }

    const propertyData = await Property.findById(property).populate("agency");
    let totalPrice = propertyData.price.rent;
    const nights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24),
    );
    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      property,
      agency: propertyData.agency._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    console.log("Booking created successfully:", booking._id);

    try {
      const mailOptions = {
        from: `"Nestorria Booking" <${process.env.SENDER_EMAIL}>`,
        to: req.user.email,
        subject: "Property Booking Confirmation",
        html: `<h2>Your Booking Details</h2><p>Booking ID: ${booking._id}</p>...`,
      };
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (mailError) {
      console.error(
        "Email failed to send, but booking is saved:",
        mailError.message,
      );
    }

    res.json({ success: true, message: "Booking Created Successfully" });
  } catch (error) {
    console.error("Main Booking Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("property agency")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to get Booking" });
  }
};

export const getAgencyBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const agency = await Agency.findOne({ owner: req.auth.userId });

    if (!agency) {
      return res.json({ success: false, message: "No Agency found" });
    }

    const bookings = await Booking.find({ agency: agency._id })
      .populate("property agency user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, b) => acc + (b.isPaid ? b.totalPrice : 0),
      0,
    );

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to get Agency Booking" });
  }
};
