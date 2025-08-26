import { useEffect, useState } from "react";

function ExperienceForm({ onAdd }) {
  const [form, setForm] = useState({
    userName: "",
    destination: "",
    locationName: "",
    country: "",
    content: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ userName: "", destination: "", locationName: "", country: "", content: "" });
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
      <h2 style={{marginBottom: "16px"}}>Add Experience</h2>
      <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
        <input name="userName" value={form.userName} onChange={handleChange} placeholder="User Name*" required style={{padding: "8px"}} />
        <input name="destination" value={form.destination} onChange={handleChange} placeholder="Destination*" required style={{padding: "8px"}} />
        <input name="locationName" value={form.locationName} onChange={handleChange} placeholder="Location Name*" required style={{padding: "8px"}} />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country*" required style={{padding: "8px"}} />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content*" required style={{padding: "8px"}} />
        <button type="submit" style={{padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"}}>Add Experience</button>
      </div>
    </form>
  );
}

function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addExperience = async (experienceData) => {
    try {
      const res = await fetch("http://localhost:5000/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceData)
      });
      if (!res.ok) throw new Error("Failed to add experience");
      const newExperience = await res.json();
      setExperiences((prev) => [...prev, newExperience]);
      setShowForm(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/experiences")
      .then(res => res.json())
      .then(data => setExperiences(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error(err);
        setExperiences([]);
      });
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "80vh" }}>
      <h2>Experiences</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
        marginBottom: "32px"
      }}>
        {Array.isArray(experiences) && experiences.map(experience => (
          <div key={experience.id || experience._id} style={{
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
            <strong style={{fontSize: "1.2em", marginBottom: "8px"}}>{experience.userName}</strong>
            <span>Destination: {experience.destination}</span>
            <span>Location: {experience.locationName}</span>
            <span>Country: {experience.country}</span>
            <span>Content: {experience.content}</span>
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
            aria-label="Add Experience"
          >
            +
          </button>
        )}
        {showForm && (
          <div style={{ position: "relative" }}>
            <ExperienceForm onAdd={addExperience} />
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

export default ExperienceList;