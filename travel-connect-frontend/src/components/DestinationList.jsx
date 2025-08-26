import { useEffect, useState } from "react";

function DestinationForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", country: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      background: "#fff",
      maxWidth: "400px"
    }}>
      <h2 style={{marginBottom: "16px"}}>Add Destination</h2>
      <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
  <input name="name" value={form.name} onChange={handleChange} placeholder="Name*" required style={{padding: "8px"}} />
  <input name="country" value={form.country} onChange={handleChange} placeholder="Country*" required style={{padding: "8px"}} />
  <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" style={{padding: "8px"}} />
        <button type="submit" style={{padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"}}>Add Destination</button>
      </div>
    </form>
  );
}

function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addDestination = async (destinationData) => {
    try {
      const res = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destinationData)
      });
      if (!res.ok) throw new Error("Failed to add destination");
      const newDestination = await res.json();
      setDestinations((prev) => [...prev, newDestination]);
      setShowForm(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then(res => res.json())
      .then(data => setDestinations(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error(err);
        setDestinations([]);
      });
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "80vh" }}>
      <h2>Destinations</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
        marginBottom: "32px"
      }}>
        {Array.isArray(destinations) && destinations.map(destination => (
          <div key={destination._id} style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "18px",
            background: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            minHeight: "180px"
          }}>
            <strong style={{fontSize: "1.2em", marginBottom: "8px"}}>{destination.name}</strong>
            <span>Country: {destination.country}</span>
            {destination.image && <img src={destination.image} alt="destination" style={{width: "80px", height: "80px", borderRadius: "8px", margin: "8px 0"}} />}
          </div>
        ))}
      </div>
      <div style={{
        position: "fixed",
        right: "32px",
        bottom: "32px",
        zIndex: 1000
      }}>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#007bff",
              color: "#fff",
              fontSize: "2em",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              cursor: "pointer"
            }}
            aria-label="Add Destination"
          >
            +
          </button>
        )}
        {showForm && (
          <div style={{ position: "relative" }}>
            <DestinationForm onAdd={addDestination} />
            <button
              onClick={() => setShowForm(false)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "transparent",
                border: "none",
                fontSize: "1.5em",
                color: "#888",
                cursor: "pointer"
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationList;
