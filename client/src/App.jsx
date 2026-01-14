import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Listing from "./pages/Listing.jsx";
import Footer from "./components/Footer.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import AgencyReg from "./components/AgencyReg.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import Sidebar from "./components/owner/Sidebar.jsx";
import ListProperty from "./pages/owner/ListProperty.jsx";
import AddProperty from "./pages/owner/AddProperty.jsx";
import Dashboard from "./pages/owner/Dashboard.jsx";

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('owner');
  const { showAgencyReg } = useAppContext();
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {!isOwnerPath && <Header />}
      {showAgencyReg && <AgencyReg />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listing/:id" element={<PropertyDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="/owner/add-property" element={<AddProperty />} />
            <Route path="/owner/list-property" element={<ListProperty />} />
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </main>
  );
};

export default App;
