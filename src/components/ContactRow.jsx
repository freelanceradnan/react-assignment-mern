
import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

export default function ContactRow({ contact, index }) {
  const { deleteContact } = useContext(ContactContext);

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      deleteContact(contact.id);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
