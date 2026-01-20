
import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactRow from "./ContactRow";

export default function ContactList() {
  const { contacts } = useContext(ContactContext);
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (filtered.length === 0) {
    return <p className="text-center">No Contact Information</p>;
  }

  return (
    <>
      <input
        className="form-control mb-3"
        placeholder="Search contact"
        onChange={e => setSearch(e.target.value)}
      />

      <table className="table table-striped">
        <tbody>
          {filtered.map((c, i) => (
            <ContactRow key={c.id} contact={c} index={i} />
          ))}
        </tbody>
      </table>
    </>
  );
}
