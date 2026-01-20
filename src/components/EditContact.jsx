import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

export default function EditContact() {
  const { contacts, setContacts } = useContext(ContactContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const contact = contacts.find(c => c.id === Number(id));

  const [form, setForm] = useState(contact || {
    firstName:"", lastName:"", email:"", phone:"", address:""
  });

  useEffect(() => {
    if(contact) setForm(contact);
  }, [contact]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updatedContacts = contacts.map(c => c.id === Number(id) ? form : c);
      setContacts(updatedContacts);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if(!contact) return <p>Contact not found</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Contact</h2>
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
            <button type="submit" className="btn btn-primary me-2">Update</button>
            <button type="button" onClick={() => navigate("/")} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
