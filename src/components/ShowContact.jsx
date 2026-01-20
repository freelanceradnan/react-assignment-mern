import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

export default function ShowContact() {
  const { contacts } = useContext(ContactContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const contact = contacts.find(c => c.id === Number(id));
  if(!contact) return <p>Contact not found</p>;

  return (
    <div className="container mt-4">
      <h2>Contact Details</h2>
      {["firstName","lastName","email","phone","address"].map(field => (
        <div className="row mb-2" key={field}>
          <label className="col-md-3 col-form-label text-capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
          <div className="col-md-9">
            <p className="form-control-plaintext">{contact[field]}</p>
          </div>
        </div>
      ))}
      <div className="row mt-3">
        <div className="col-md-9 offset-md-3">
          <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-secondary me-2">Edit</button>
          <button onClick={() => navigate("/")} className="btn btn-outline-secondary">Back</button>
        </div>
      </div>
    </div>
  );
}
