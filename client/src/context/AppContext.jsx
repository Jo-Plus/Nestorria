import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProperties } from "../assets/data.js";
import { useUser } from "@clerk/clerk-react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const { user } = useUser();
  const [showAgencyReg, setShowAgencyReg] = useState(false)
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    setProperties(dummyProperties);
  }, []);

  return (
    <AppContext.Provider
      value={{
        navigate,
        properties,
        setProperties,
        currency,
        user,
        showAgencyReg,
        setShowAgencyReg,
        isOwner,
        setIsOwner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }
  return context;
};
