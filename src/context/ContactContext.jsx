import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ContactContext = createContext(null);

const API = "http://localhost:5000/contacts";

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API);
      setContacts(res.data);
    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, setContacts, loading }}>
      {children}
    </ContactContext.Provider>
  );
};
