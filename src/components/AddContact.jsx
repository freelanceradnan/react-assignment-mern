import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

export default function AddContact() {
  const { contacts, setContacts } = useContext(ContactContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { ...form, id: Date.now() };
    try {
      await fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      setContacts([...contacts, newContact]);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        {["firstName","lastName","email","phone","address"].map((field) => (
          <div className="mb-3 row" key={field}>
            <label className="col-md-3 col-form-label text-capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            <div className="col-md-9">
              {field !== "address" ? (
                <input
                  type="text"
                  name={field}
                  className="form-control"
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <textarea
                  name={field}
                  className="form-control"
                  rows="3"
                  value={form[field]}
                  onChange={handleChange}
                  required
                ></textarea>
              )}
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-md-9 offset-md-3">
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button type="button" onClick={() => navigate("/")} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
