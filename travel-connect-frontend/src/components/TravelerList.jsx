import { useEffect, useState } from "react";

function TravelerForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    phone: "",
    email: "",
    country: "",
    sex: "Male"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", avatar: "", phone: "", email: "", country: "", sex: "Male" });
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
      <h2 style={{marginBottom: "16px"}}>Add Traveler</h2>
      <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name*" required style={{padding: "8px"}} />
        <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL" style={{padding: "8px"}} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" style={{padding: "8px"}} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={{padding: "8px"}} />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" style={{padding: "8px"}} />
        <select name="sex" value={form.sex} onChange={handleChange} style={{padding: "8px"}}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" style={{padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"}}>Add Traveler</button>
      </div>
    </form>
  );
}



function TravelerList() {
  const [travelers, setTravelers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addTraveler = async (travelerData) => {
    try {
      const res = await fetch("http://localhost:5000/api/travelers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(travelerData)
      });
      if (!res.ok) throw new Error("Failed to add traveler");
      const newTraveler = await res.json();
      setTravelers((prev) => [...prev, newTraveler]);
      setShowForm(false); // Hide form after submit
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/travelers")
      .then(res => res.json())
      .then(data => setTravelers(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error(err);
        setTravelers([]);
      });
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "80vh" }}>
      <h2>Travelers</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
        marginBottom: "32px"
      }}>
        {Array.isArray(travelers) && travelers.map(traveler => (
          <div key={traveler._id} style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "18px",
            background: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            minHeight: "220px"
          }}>
            <strong style={{fontSize: "1.2em", marginBottom: "8px"}}>{traveler.name}</strong>
            {traveler.avatar && <img src={traveler.avatar} alt="avatar" style={{width: "60px", height: "60px", borderRadius: "50%", margin: "8px 0"}} />}
            <span>Phone: {traveler.phone}</span>
            <span>Email: {traveler.email}</span>
            <span>Country: {traveler.country}</span>
            <span>Sex: {traveler.sex}</span>
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
            aria-label="Add Traveler"
          >
            +
          </button>
        )}
        {showForm && (
          <div style={{ position: "relative" }}>
            <TravelerForm onAdd={addTraveler} />
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

export default TravelerList;