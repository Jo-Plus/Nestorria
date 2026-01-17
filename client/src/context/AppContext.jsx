import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showAgencyReg, setShowAgencyReg] = useState(false);
  const [properties, setProperties] = useState([]);

  // 🔍 Search query state
  const [searchQuery, setSearchQuery] = useState("");

  const getProperties = async () => {
    try {
      const { data } = await axios.get("/api/properties");
      if (data.success) {
        setProperties(data.properties);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsOwner(data.role === "agencyOwner");
      } else if (data.message === "User not synced yet") {
        setTimeout(getUser, 2000);
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    if (user) getUser();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        getToken,
        isOwner,
        setIsOwner,
        showAgencyReg,
        setShowAgencyReg,
        navigate,
        properties,
        setProperties,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
