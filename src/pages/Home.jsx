import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";

export default function Home() {
  const { contacts, loading, setContacts } = useContext(ContactContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("default");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await fetch(`http://localhost:5000/contacts/${id}`, {
          method: "DELETE",
        });
        setContacts(contacts.filter((c) => c.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

 
  let filteredContacts = contacts.filter((c) =>
    c.firstName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  // Sort filter
  if (filter === "firstName") {
    filteredContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (filter === "lastName") {
    filteredContacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
  } else if (filter === "oldest") {
    filteredContacts.sort((a, b) => a.id - b.id);
  }

  return (
    <div className="container mt-4">
      <h2>All Contacts</h2>

      
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="form-control me-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <a href="/add" className="btn btn-success">
          Add New
        </a>
      </div>

      {/* Filter */}
      <div className="d-flex mb-3">
        <select
          className="form-select w-25"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="firstName">First Name (A → Z)</option>
          <option value="lastName">Last Name (A → Z)</option>
          <option value="oldest">Oldest To First</option>
        </select>
      </div>

     
      {loading && <p>Loading...</p>}
      {!loading && filteredContacts.length === 0 && <p>No Contact Information</p>}

      
      {!loading && filteredContacts.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <a href={`/show/${c.id}`} className="btn btn-sm btn-info me-1">
                    Show
                  </a>
                  <a href={`/edit/${c.id}`} className="btn btn-sm btn-secondary me-1">
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
